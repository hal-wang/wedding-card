import { swaggerJSDoc } from "@sfajs/swagger";

export function getSwaggerOptions(version: string, dev: boolean) {
  return <swaggerJSDoc.Options>{
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Wedding card",
        description: "网络喜帖，线上地址 https://wedding.hal.wang",
        version: version,
        license: {
          name: "MIT",
        },
        contact: {
          email: "hi@hal.wang",
        },
      },
      servers: [
        {
          url: "/" + (dev ? "" : process.env.API_NAME),
        },
      ],
      schemes: ["https"],
      tags: [
        {
          name: "people",
        },
        {
          name: "res",
        },
      ],
      components: {
        securitySchemes: {
          admin: {
            type: "apiKey",
            in: "header",
            name: "admin",
          },
        },
      },
    },
    apis: ["actions/**/*.js"],
  };
}
