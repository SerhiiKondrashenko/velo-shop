import importProductsFile from "./importProductsFile";
import AWSMock from 'aws-sdk-mock';
import {EMPTY_NAME_PARAMETER} from "../utils/errorMessages";

const TEST_SIGNED_URL = 'https://fake-aws.amazonaws.com/my-signed-url-for-testing';

beforeEach(() => {
    AWSMock.mock('S3', 'getSignedUrl', (operation, params, cb) => {
        cb(null, TEST_SIGNED_URL);
    });
});

afterEach(() => {
    AWSMock.restore('S3');
})

it('should return response with url', async () => {
    const request = {
        queryStringParameters: {
            name: "test-file"
        }
    };

    const response = await importProductsFile(request);

    const {statusCode, body} = response;
    expect(statusCode).toBe(200);
    const content = JSON.parse(body);
    expect(content).toBe(TEST_SIGNED_URL);
});

it('should return response with 400 status', async () => {

    const response = await importProductsFile({
        queryStringParameters: {
            name: ''
        }
    });

    const {statusCode, body} = response;
    const content = JSON.parse(body);
    expect(statusCode).toBe(400);
    expect(content.message).toBe(EMPTY_NAME_PARAMETER);

})