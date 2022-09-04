import { Inject } from "@ipare/inject";
import { Body } from "@ipare/pipe";
import { Action } from "@ipare/router";
import { Admin } from "../../decorators/admin";
import { V } from "@ipare/validator";
import { InvitePeopleDto } from "../../dtos/invite-people.dto";
import { CollectionService } from "../../services/collection.service";

@V()
  .Tags("people")
  .Description("Invite someone")
  .ResponseDescription(204, "success")
  .Security({
    admin: [],
  })
@Admin
export default class extends Action {
  @Inject
  private readonly collectionService!: CollectionService;

  @Body
  private readonly people!: InvitePeopleDto;

  async invoke(): Promise<void> {
    if (!this.people?.name) {
      this.badRequestMsg({ message: "请填写人名" });
      return;
    }

    const countRes = await this.collectionService.people
      .where({
        _id: this.people.name,
      })
      .count();
    if (!!countRes.total) {
      this.noContent();
      return;
    }

    await this.collectionService.people.add({
      _id: this.people.name,
    });
    this.noContent();
  }
}
