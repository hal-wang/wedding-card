module.exports.isPhone = function (str) {
    var strRegex = /^(12|13|14|15|16|17|18|19)\d{9}$/;
    return strRegex.test(str);
};

module.exports.isEmail = function (str) {
    var strRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+/;
    return strRegex.test(str);
};

module.exports.isCaptcha = function (str) {
    var strRegex = /\d{6}/;
    return strRegex.test(str);
};
