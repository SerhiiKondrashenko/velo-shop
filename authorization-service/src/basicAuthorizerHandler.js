

export default function basicAuthorizerHandler(event, _context, cb) {
    try {
        const {authorizationToken: authorizationHeader, methodArn} = event;
        const encodedCredentials = authorizationHeader.split(" ")[1];
        const [username, password] = Buffer.from(encodedCredentials, "base64")
            .toString()
            .split(":");
        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password ? "Deny" : "Allow"
        const policy = generatePolicy(encodedCredentials, methodArn, effect);
        console.log(`Policy: ${JSON.stringify(policy)}`);

        cb(null, policy);
    } catch (err) {
        cb("Unauthorized", err.message);
    }
}

function generatePolicy(principalId, resource, effect) {
    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    }
}
