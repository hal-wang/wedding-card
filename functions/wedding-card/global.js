const isTest = true

module.exports = {
  diary: {
    maxTxtLength: 10000,
    maxComplexLength: 200000,
    maxTitleLength: 100,
    maxFeelingLength: 500,
    maxWeatherLength: 100,
    maxLocationLength: 100
  },
  user: {
    rootUserId: 'root',
    testUserId: 'Test',
    testUserEmail: 'yttest@hubery.wang',
    testUserPhone: '12345678900',
    testUserPswd: 'ytdiary'
  },
  alipay: {
    appId: '2021001171645594',
    alipayPublicKey:
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuIyhj3NFP3alZ6bbTxTuTK3gM/ahYlEirX80dBoOaD3SZIjmp3ayjlR2XNJsQWuHB2ail9U3G78ybHvKptQEqUPb3fAYlExlWHu1PtUhH3dnGybOrQYvkqkQSdsNohNPvpR7wXn53QEkHd0PU/3fsR4gc/y69r2oPfkyKJKsY0HMLjkw/5VGDaaw5R0BBwHhotc5YzZuP3yhj9rhYlcbMOxB8RH7JtYRisApYss0eCgx4BI7PdI5n7sx6SkHEFwCsyFZdEWfidd49PLmzyAs4clxXc3eC0LL8fR03utQKfZDusOkFt9qC5ax4y4nmhmorHYB+SbJxHTbAswRJv2VLQIDAQAB',
    appPrivateKey:
      'MIIEpAIBAAKCAQEA2OPsZLbbOMCyVKd+Lwo3ni6AYUBGWxymIf2gGiS3vSQ5Ls2po5IK0EIRhoeo1z2bCdhP24pa8oE/ml8/zDsW0ZEiTux9mw2pcWi3Xak9fAIHQl77wmVped9CLlZE1pGIlcFNrprI2yJ/KwzkiP2KyfDaYn5iQup1uIVVtErA12SyD2RJxP4+0YdSU6Hz4DCDmNJYdatQnxhc7oQPAQXyHZHsZBybET4ghStkMsJ1sY3pPsYlGQDQDRt+rBavwssbnLuol9mAoQZwtKurZOaFhBtXztS1p7d7g5mT25juPGY29lcy08eRKiccEfC4ll6WT7KcbFGDhv4o6HHZgEn2QQIDAQABAoIBADp+hgPHmSoeNjpEjfCL1eIwcmlIF3F9MYUbTPGgE3nMaiuoRecafRYbq3RX4/5g3A50q1zvXIXou8mbhK5FBWtxtAoLF/kYXyl573IwMaffOCv7R/TuutqmjsfGdnxT9b1Fy/iaQC9xh1CKApy7nJHIBm3n3gJkD2m7dBjSzF2KiGuSquE4AAm5lewmOCLRCPNJWhuIO2rESDGSH7qQeMPXHMLWW5NJ10WPdEbPEN/s8RSQYtk4hE7a9zEGzGgMgaJyXo7H5PJ6e0Ao6aQuLKaqmwSqQthpIZjEJo7cX1Caw4t3MkojoSvUo8DAQRp6btlGMczzHRgSoarAexX4JB0CgYEA+xqfkaaqAmHn/1QjjNRjQfpmLUPoBECVQSa3oDk/uvcQ/aknrtkkuC6l8AG7++ze0MK+bb3gZBILcL5zitOOvQ9JnFU0KokQeFtxF+smQSI0gzGgR1AdnNmk226Q7v4p8vZcpBKmxUtVfUMIybkHk5erdFGjG8xsyemrM5qs7aMCgYEA3R6GFcHo+vWD9H7Y4Nbce2s0I9Lna+Z5riBRjGO/KDaRYJomO97NDkIAd3JQIUmLwVfQZZnZtF1yXot7LWjizngRRHvocYGDFsxuGPw82Bq13ZcPRdm1clsjnTJB22VtYLfEP0b86mjwPresiZG6HjpLRceAnxju8JSFamfcwssCgYEA0IVYU2Sas6XIOYEOkIli78xXg2lrx/Q1vcfAHz7LTKCVLICHIqzR0F10kS1vhRI8KhI+fvV53MAbXgHaA0QRubBzSW58BoKR+dC9xsYQm3AjOXtBhVbjcHhQbaSQmNbZ0RiC8AFJGnenw4CiUJnlz8vYppyQnaoSAU6ZTB47Uo8CgYEAw5k9uT9oDZ9jE8Olq/bE4PQrEkl9Z4hgOPTjzlFqBnOG1DJoAewL7kHaUc8wLNH3K5e3hDi9SPyksBeoZbnzb/rsI22MZ+POBzvdZIK0e+Hc4ODApOR5ymfusB6F/ULSp4zHr8Xm8qDTbFdj6+mZ/yVH8rkRASu4Kd7nygGIWlMCgYB7G9H1VYjw7WGU50WI5sirbhGyCbVYXG070yUrGqfiWYEeta3NtIId1EGPVxVIPVWU5wGHEe+0WFsLgJOS+Ga+fWLk9z5Vq/LoU/KFza8BqmmDqJdnE/NPNwC2QK7rnSV+qAdAtWrUU5EV+Af48/uSTn8JY7t5iuzVsB1dCe8vOw==',
    testBaseNotifyUrl: 'https://a.hubery.wang:44443/alipay',
    get baseNotifyUrl() {
      if (isTest) return this.testBaseNotifyUrl
      else return 'https://ytapi.hubery.wang/wxpay'
    }
  },
  weChatPay: {
    appId: 'wxf65c9357b09a4ded',
    mchId: '1600878295',
    key: 'y04a1oejJ16leJO2Mcm40JOj2E3C1W7v',
    v3Key: '',
    certificate: '',
    rsaPublicKey: '',
    testBaseNotifyUrl: 'https://a.hubery.wang:44443/wxpay',
    // "TestBaseNotifyUrl": "http://ngrok.hubery.wang:4440/wxpay",
    get baseNotifyUrl() {
      if (isTest) return this.testBaseNotifyUrl
      else return 'https://ytapi.hubery.wang/wxpay'
    },
    appSecret: '8753f1f3876b429dea221e5ce06111cd'
  },
  cos: {
    appid: '1253337886',
    region: 'ap-shanghai',
    get bucket() {
      if (isTest) return 'ytdiarytest-1253337886'
      else return 'ytdiary-1253337886'
    },
    testBucket: 'ytdiarytest-1253337886',
    dimgFolder: 'dimg',
    avatarFolder: 'uavt',
    expires: 900
  },
  rootPwd: 'hao8797rootPwd.',
  email: {
    email: 'support@hubery.wang',
    host: 'smtp.exmail.qq.com',
    port: '587',
    pswd: 'hao303521E!.',
    notifyHtml:
      '<div style=" min-width: 0; max-width: 600px; margin-left: auto; margin-right: auto; background-color: #e0e8ee; border-radius: 10px; padding-top: 20px; padding-bottom: 10px; "> <div style="font-size: 18px; margin-left: 20px">{{title}}</div> <hr /> <div style=" text-align: center; margin-top: 30px; margin-bottom: 30px; font-size: 22px; " > {{main}} </div> <hr /> <div style="margin-top: 10px; opacity: 0.8; font-size: 16px; margin-left: 20px" > {{tail}} </div></div>'
  },
  sms: {
    sign: '映天日记',
    region: 'ap-shanghai',
    appId: '1400153251',
    appKey: '0268ae5986b98195e50bfc9cd76d227e',
    conInvateTmpId: '239296',
    captchaTmpId: '239240'
  },
  tencent: {
    secretId: 'AKIDelnb9RPNxHeqnWqDCvOUO2R2NSN6AUKw',
    secretKey: 'wgEaCcokRt52njV4tVt3zg7KHyPBj2iv'
  },
  feedbackEmail: 'support@hubery.wang'
}
