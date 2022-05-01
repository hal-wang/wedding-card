import { SfaCloudbase } from "@sfajs/cloudbase";
import "@sfajs/router";
import "@sfajs/inject";
import "@sfajs/swagger";
import { swaggerJSDoc } from "@sfajs/swagger";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { AdminAuthMiddleware } from "./middlewares/admin-auth.middleware";
import { CollectionService } from "./services/collection.service";
import { CbappService } from "./services/cbapp.service";
import { InjectType } from "@sfajs/inject";
import { Startup } from "@sfajs/core";

const version = (() => {
  let path = "./package.json";
  while (!fs.existsSync(path)) {
    path = "../" + path;
  }
  const pkgStr = fs.readFileSync(path, "utf-8");
  return JSON.parse(pkgStr).version;
})();

function getSwaggerOptions(dev: boolean) {
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
    apis: dev ? ["src/actions/**/*.ts"] : ["actions/**/*.js"],
  };
}

export function setStartup<T extends Startup>(startup: T, dev: boolean): T {
  if (dev) {
    dotenv.config({
      path: "./.env.local",
    });
  }

  return startup
    .use(async (ctx, next) => {
      ctx.res.setHeader("version", version);
      await next();
    })
    .useInject()
    .inject(CollectionService, InjectType.Singleton)
    .inject(CbappService, InjectType.Singleton)
    .useSwagger({
      options: getSwaggerOptions(dev),
    })
    .add(AdminAuthMiddleware)
    .useRouter({
      dir: dev ? "src/actions" : "actions",
    });
}

const startup = setStartup(new SfaCloudbase(), false);
export const main = async (
  event: Record<string, unknown>,
  context: Record<string, unknown>
): Promise<unknown> => {
  console.log("event", JSON.stringify(event));
  console.log("context", JSON.stringify(context));

  return await startup.run(event, context);
};
