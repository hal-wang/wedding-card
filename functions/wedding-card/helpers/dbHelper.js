const { getResResult } = require("./helperResult");

module.exports.getField = async function (db, col, doc, field) {
    const fieldObj = {};
    fieldObj[field] = true;

    const res = await db.collection(col).doc(doc).field(fieldObj).get();
    return getResResult(res, () => {
        if (!res.data || res.data.length <= 0 || !res.data[0][field]) return [];
        return res.data[0][field];
    });
};

module.exports.updateField = async function (db, col, doc, field, value) {
    const fieldObj = {};
    fieldObj[field] = value;

    const res = await db.collection(col).doc(doc).update(fieldObj);
    return getResResult(res, () => res.updated);
};
