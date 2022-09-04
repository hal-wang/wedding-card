import { V } from "@ipare/validator";

export class FindNameResultDto {
  @V().Description("result")
  exit!: boolean;
}
