import { Inject } from "@ipare/inject";
import { Param } from "@ipare/pipe";
import { Action } from "@ipare/router";
import { CollectionService } from "../../services/collection.service";
import { V } from "@ipare/validator";
import { FindNameResultDto } from "../../dtos/find-name-result.dto";

@V()
  .Tags("people")
  .Description("Whether a person exists or not")
  .Response(200, FindNameResultDto)
  .ResponseDescription(200, "success")
export default class extends Action {
  @Inject
  private readonly collectionService!: CollectionService;

  @Param("name")
  @V().IsOptional().MaxLength(20).Description("name")
  private readonly name!: string;

  async invoke(): Promise<void> {
    if (!this.name) {
      this.ok({
        exist: false,
      });
      return;
    }

    const countRes = await this.collectionService.people
      .where({
        _id: this.name,
      })
      .count();
    this.ok({
      exist: !!countRes.total,
    });
  }
}
