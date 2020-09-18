const badRequest = require("./badRequest");

const resBadContent = function (res) {
    return `${res.code}, ${res.message}`;
};

exports.isResSuccess = function (res) {
    return !res.code;
};
exports.resBadRequest = function (res) {
    return badRequest(resBadContent(res));
};

exports.resBadContent = resBadContent;
