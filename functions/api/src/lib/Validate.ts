export default class Validate {
  static isPhone(str: string): boolean {
    const strRegex = /^(12|13|14|15|16|17|18|19)\d{9}$/;
    return strRegex.test(str);
  }

  static isEmail(str: string): boolean {
    const strRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+/;
    return strRegex.test(str);
  }

  static isCaptcha(str: string): boolean {
    const strRegex = /\d{6}/;
    return strRegex.test(str);
  }
}
