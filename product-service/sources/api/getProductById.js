import getProductByIdService from '../services/getProductByIdService';
import sendResponse from '../utils/sendResponse';
import {INCORRECT_PRODUCT_ID, PRODUCT_NOT_FOUND} from '../utils/errorMessages';

export default async ({pathParameters}) => {
    try {
        const { productId = '' } = pathParameters;
        return sendResponse(200, await getProductByIdService(productId));
    } catch ({message}) {
        switch (message) {
            case PRODUCT_NOT_FOUND:
                return sendResponse(404, {message});
            case INCORRECT_PRODUCT_ID:
                return sendResponse(400, {message});
            default:
                return sendResponse(500, "Server Error");
        }
    }
};
