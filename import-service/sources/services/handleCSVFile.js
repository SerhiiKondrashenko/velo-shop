import {AWS_REGION, BUCKET_NAME} from "../configuration";
import {S3, SQS} from "aws-sdk";
import * as csvParser from "csv-parser";


async function parseCSV(name) {
    const s3 = new S3({region: AWS_REGION});
    const sqs = new SQS({region: AWS_REGION});

    console.log('Parsing CSV');

    s3.getObject({
        Bucket: BUCKET_NAME,
        Key: name,
    })
        .createReadStream()
        .pipe(csvParser())
        .on("data", (product) => {
            sqs.sendMessage({
                QueueUrl: process.env.SQS_URL,
                MessageBody: JSON.stringify(product),
            }, () => {
                const { title } = product;
                console.log('Send message for product: ', title);
            })
        })
        .on("end", () => {
            console.log('Parse finished');
        })
        .on("error", () => {
            console.error("CSV Parse error")
        })
}

async function moveToParsed(name) {
    console.log('Moving file', name);

    const s3 = new S3({ region: AWS_REGION });
    await s3.copyObject({
        Bucket: BUCKET_NAME,
        CopySource: BUCKET_NAME + '/' + name,
        Key: name.replace("uploaded", "parsed")
    }).promise();

    console.log('File copied to ', "/parsed");

    await s3.deleteObject({
        Bucket: BUCKET_NAME,
        Key: name
    }).promise();

    console.log('Old file deleted', name);
}


export default async function handleCSVFile(csvFilename) {
    await parseCSV(csvFilename);
    await moveToParsed(csvFilename);
}


