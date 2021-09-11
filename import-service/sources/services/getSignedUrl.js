import { S3 } from 'aws-sdk';
import {BUCKET_NAME, CATALOG_PATH, AWS_REGION} from "../configuration";
import {EMPTY_NAME_PARAMETER} from "../utils/errorMessages";

export default async function getSignedUrl(name) {
    if (typeof name !== 'string' || name.length === 0) {
        throw new Error(EMPTY_NAME_PARAMETER);
    }

    const s3 = new S3({ region: AWS_REGION });
    const params = {
        Bucket: BUCKET_NAME,
        Key: CATALOG_PATH + name,
        Expires: 60,
        ContentType: "text/csv"
    }
    return s3.getSignedUrlPromise("putObject", params);
}
