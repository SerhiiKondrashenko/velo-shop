import sendResponse from "../utils/sendResponse";
import validateProduct from "../utils/validateProduct";
import addProductService from "../services/addProductService";
import {INVALID_PRODUCT_DATA} from "../utils/errorMessages";

export default async (request) => {
    try {
        console.log('---Incoming Request', request);
        const { body } = request;
        const product = JSON.parse(body);
        const errors = validateProduct(product);
        if (Object.keys(errors).length > 0) {
            return sendResponse(400, { message: INVALID_PRODUCT_DATA,  errors})
        }
        const record = await addProductService(product);
        return sendResponse(200, { product: record })
    } catch (e) {
        return sendResponse(500, {message: 'Server Error'});
    }
}
