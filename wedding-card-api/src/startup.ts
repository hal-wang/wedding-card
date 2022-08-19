import "@ipare/router";
import "@ipare/inject";
import "@ipare/swagger";
import "@ipare/env";
import { CollectionService } from "./services/collection.service";
import { CbappService } from "./services/cbapp.service";
import { InjectType } from "@ipare/inject";
import { Startup } from "@ipare/core";
import "@ipare/filter";
import { AdminFilter } from "./filters/admin.filter";
import { getVersion } from "@ipare/env";

export default function <T extends Startup>(startup: T, mode: string): T {
  return startup
    .useVersion()
    .useEnv(mode)
    .useInject()
    .inject(CollectionService, InjectType.Singleton)
    .inject(CbappService, InjectType.Singleton)
    .useSwagger({
      builder: (builder) =>
        builder
          .addInfo({
            title: "Wedding card",
            description: "电子喜帖，线上地址 https://wedding.hal.wang",
            version: getVersion(process.cwd()) ?? "",
            license: {
              name: "MIT",
            },
            contact: {
              email: "hi@hal.wang",
            },
          })
          .addServer({
            url: "/" + (mode == "production" ? process.env.API_NAME : ""),
          })
          .addSecurityScheme("admin", {
            type: "apiKey",
            in: "header",
            name: "admin",
          }),
    })
    .useGlobalFilter(AdminFilter)
    .useRouter();
}
