import SfaCloudbase from "@sfajs/cloudbase";
import Auth from "./lib/Auth";
import "@sfajs/router";
import "@sfajs/swagger";
import Collections from "./lib/Collections";
import { swaggerJSDoc } from "@sfajs/swagger";
import * as fs from "fs";

export const main = async (
  event: Record<string, unknown>,
  context: Record<string, unknown>
): Promise<unknown> => {
  console.log("env", event, context);

  return await new SfaCloudbase(event, context)
    .use(async (ctx, next) => {
      ctx.res.headers.version = version;
      await next();
    })
    .useSwagger({
      options: swaggerOptions,
    })
    .useCloudbaseApp()
    .useCloudbaseDbhelper()
    .use(async (ctx, next) => {
      Collections.ctx = ctx;
      await next();
    })
    .useRouterParser()
    .add(() => new Auth())
    .run();
};

const version = (() => {
  let path = "./package.json";
  while (!fs.existsSync(path)) {
    path = "../" + path;
  }
  const pkgStr = fs.readFileSync(path, "utf-8");
  return JSON.parse(pkgStr).version;
})();

export const swaggerOptions = <swaggerJSDoc.Options>{
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
        url: "/" + process.env.API_NAME,
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
  apis: ["controllers/**/*.js"],
};
