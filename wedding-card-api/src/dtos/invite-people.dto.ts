import { V } from "@ipare/validator";

@V().Description(`People info`)
export class InvitePeopleDto {
  @V()
    .Description(`someone's name`)
    .Required()
    .IsString()
    .MinLength(1)
    .MinLength(20)
  name!: string;
}
