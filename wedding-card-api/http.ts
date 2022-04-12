import "@sfajs/http";
import { SfaHttp } from "@sfajs/http";
import { setStartup } from "./src";

setStartup(
  new SfaHttp().useHttpJsonBody().use(async (ctx, next) => {
    console.log(ctx.req.method, ctx.req.path);
    await next();
  }),
  true
).listen(2333);

console.log("start: http://localhost:2333");
