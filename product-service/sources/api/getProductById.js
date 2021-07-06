import getProductByIdService from "../services/getProductByIdService";
import sendResponse from "../utils/sendResponse";

export default async ({pathParameters}) => {
    try {
        const { productId = '' } = pathParameters;
        return sendResponse(200, getProductByIdService(productId));
    } catch ({message}) {
        return sendResponse(404, {message})
    }
};
