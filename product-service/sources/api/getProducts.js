import sendResponse from "../utils/sendResponse";
import getProductsService from "../services/getProductsService";

export default async (request) => {
    try {
        console.log('---Incoming Request', request);
        return sendResponse(200, await getProductsService());
    } catch (e) {
        return sendResponse(500, 'Internal Server Error');
    }
};
