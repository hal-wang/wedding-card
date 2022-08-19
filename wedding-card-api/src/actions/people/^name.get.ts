import { Inject } from "@ipare/inject";
import { Param } from "@ipare/pipe";
import { Action } from "@ipare/router";
import { ApiDescription, ApiResponses, ApiTags } from "@ipare/swagger";
import { CollectionService } from "../../services/collection.service";

@ApiTags("people")
@ApiDescription("Whether a person exists or not")
@ApiResponses({
  "200": {
    description: "success",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            exit: {
              type: "boolean",
              description: "result",
            },
          },
        },
      },
    },
  },
})
export default class extends Action {
  @Inject
  private readonly collectionService!: CollectionService;

  @Param("name")
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
