import getSignedUrl from "../services/getSignedUrl";
import sendResponse from "../utils/sendResponse";

export default async (request) => {
    const {queryStringParameters: { name }} = request;
    try {
        const url = await getSignedUrl(name);
        return sendResponse(200, url);
    } catch (e) {
        return sendResponse(500, {message: "Server Error"});
    }
}
