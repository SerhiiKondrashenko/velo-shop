import addProductService from "../services/addProductService";
import {SNS} from 'aws-sdk';

export default async ({ Records }) => {
    const products = Records.map(({ body }) => JSON.parse(body));
    const notifier = new SNS({region: 'us-east-1'});
    console.log('---Consuming sqs message!');
    try {
        for(let product of products) {
            const newProduct = await addProductService(product);
            await notifier.publish({
                Subject: 'Product successfully added to database',
                Message: `Product ${newProduct.title} were added to database`,
                TopicArn: process.env.SNS_ARN,
                MessageAttributes: {
                    title: {
                        DataType: "String",
                        StringValue: newProduct.title
                    }
                }
            }).promise();
        }
    } catch ({ message }) {
        console.log('---Error during adding product: ', message);
    }
}
