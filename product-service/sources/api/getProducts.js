import sendResponse from "../utils/sendResponse";
import getProductsService from "../services/getProductsService";

export default async () => {
    try {
        sendResponse(200, await getProductsService());
    } catch (e) {
        sendResponse(500, 'Internal Server Error');
    }
};
