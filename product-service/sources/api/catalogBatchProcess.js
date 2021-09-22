import addProductService from "../services/addProductService";
import {SNS} from 'aws-sdk';

export default async ({ Records }) => {
    const products = Records.map(({ body }) => JSON.parse(body));
    const notifier = new SNS({region: 'us-east-1'});

    try {
        for(let product of products) {
            await addProductService(product);
        }
        notifier.publish({
            Subject: 'Products were added to database',
            Message: 'Products list was successfully added',
            TopicArn: process.env.SNS_ARN
        })
    } catch (e) {

    }
}
