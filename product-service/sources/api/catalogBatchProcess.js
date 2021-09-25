import addProductService from "../services/addProductService";
import {SNS} from 'aws-sdk';

export default async ({ Records }) => {
    const products = Records.map(({ body }) => JSON.parse(body));
    const notifier = new SNS({region: 'us-east-1'});
    console.log('---Consuming sqs message!');
    try {
        for(let product of products) {
            await addProductService(product);
        }
        const content = await notifier.publish({
            Subject: 'Products were added to database',
            Message: 'Products list was successfully added',
            TopicArn: process.env.SNS_ARN
        }).promise();
        console.log('---Successfully consumed!', content);
    } catch ({ message }) {
        console.log('---Error during adding product: ', message);
    }
}
