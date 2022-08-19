import { DtoDescription, DtoRequired } from "@ipare/swagger";

@DtoDescription(`People info`)
export class InvitePeopleDto {
  @DtoDescription(`someone's name`)
  @DtoRequired()
  name!: string;
}
