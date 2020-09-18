module.exports = function (statusCode, body, headers) {
    return {
        isBase64: false,
        statusCode: statusCode,
        headers: Object.assign(
            {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            headers || {}
        ),
        body: body,
    };
};
