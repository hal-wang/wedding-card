const tcb = require("@cloudbase/node-sdk");
const app = tcb.init();

module.exports.app = app;

const db = function () {
    return app.database();
};

module.exports.db = db;

module.exports.userCollection = function () {
    return db().collection("user");
};

module.exports.diaryCollection = function () {
    return db().collection("diary");
};

module.exports.connectionCollection = function () {
    return db().collection("connection");
};
