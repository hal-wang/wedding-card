import { V } from "@ipare/validator";

@V().Description("Is the name existed")
export class FindNameResultDto {
  @V().Description("result")
  exit!: boolean;
}
