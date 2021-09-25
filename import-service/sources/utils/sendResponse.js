

export default function sendResponse(code, message) {
    return {
        statusCode: code,
        headers: {
            'Access-Control-Allow-Method': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(message)
    }
}
