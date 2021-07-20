import sendResponse from "../utils/sendResponse";
import getProductsService from "../services/getProductsService";

export default async () => sendResponse(200, getProductsService());
