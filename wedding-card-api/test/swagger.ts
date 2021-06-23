import { SfaHttp } from "@sfajs/http";
import { swaggerOptions } from "../src";
import { swaggerJSDoc } from "@sfajs/swagger";
import "@sfajs/swagger";

const options = <swaggerJSDoc.Options>(
  JSON.parse(JSON.stringify(swaggerOptions))
);
options.apis = ["src/controllers/**/*.ts"];

new SfaHttp()
  .useSwagger({
    options: options,
  })
  .listen(2333);

console.log("http://localhost:2333");
