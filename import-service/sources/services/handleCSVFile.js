import {AWS_REGION, BUCKET_NAME} from "../configuration";
import {S3} from "aws-sdk";
import * as csvParser from "csv-parser";


async function parseCSV(name) {
    const list = [];
    const s3 = new S3({region: AWS_REGION})

    console.log('Parsing CSV');

    s3.getObject({
        Bucket: BUCKET_NAME,
        Key: name,
    })
        .createReadStream()
        .pipe(csvParser())
        .on("data", (data) => list.push(data))
        .on("end", () => {
            console.log('Parse finished');
            console.log(list);
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
        Key: "/parsed"
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


