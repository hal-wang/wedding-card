import "@sfajs/router";
import "@sfajs/inject";
import "@sfajs/swagger";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { CollectionService } from "./services/collection.service";
import { CbappService } from "./services/cbapp.service";
import { InjectType } from "@sfajs/inject";
import { Startup } from "@sfajs/core";
import { getSwaggerOptions } from "./utils/swagger";
import "@sfajs/filter";
import { AdminFilter } from "./filters/admin.filter";

const version = (() => {
  let path = "./package.json";
  while (!fs.existsSync(path)) {
    path = "../" + path;
  }
  const pkgStr = fs.readFileSync(path, "utf-8");
  return JSON.parse(pkgStr).version;
})();

export default function <T extends Startup>(startup: T, mode?: string): T {
  const dev = mode == "development";
  if (dev) {
    dotenv.config({
      path: "../.env.local",
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
      options: getSwaggerOptions(version, dev),
    })
    .useGlobalFilter(AdminFilter)
    .useRouter();
}
