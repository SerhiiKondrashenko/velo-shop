import { S3 } from 'aws-sdk';
import {BUCKET_NAME, CATALOG_PATH, AWS_REGION} from "../configuration";

export default async function getSignedUrl(name) {
    const s3 = new S3({ region: AWS_REGION });
    const params = {
        Bucket: BUCKET_NAME,
        Key: CATALOG_PATH + name,
        Expires: 60,
        ContentType: "text/csv"
    }
    return s3.getSignedUrl("putObject", params);
}
