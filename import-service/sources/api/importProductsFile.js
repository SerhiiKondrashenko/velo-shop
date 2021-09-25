import getSignedUrl from "../services/getSignedUrl";
import sendResponse from "../utils/sendResponse";
import {EMPTY_NAME_PARAMETER} from "../utils/errorMessages";

export default async (request) => {
    const {queryStringParameters: { name }} = request;
    try {
        const url = await getSignedUrl(name);
        return sendResponse(200, url);
    } catch ({message}) {
        switch (message) {
            case EMPTY_NAME_PARAMETER:
                return sendResponse(400, {message});
            default:
                return sendResponse(500, {message: "Server Error"});
        }
    }
}
