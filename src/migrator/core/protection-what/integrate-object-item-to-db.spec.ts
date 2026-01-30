import { describe, it } from "@jest/globals";
import {
  integrateObjectItemToDb,
  type IntegrateObjectItemToDbParams,
} from "@/migrator/core/protection-what/integrate-object-item-to-db.ts";
import {
  PROTECTION_ACTION_TYPE_ENUM,
  PROTECTION_DIRECTION_ENUM,
} from "@/constants.ts";

describe("Integrate Object Item to DB", () => {
  it("Should Integrate Proxmox Object Item to DB", async () => {
    const objectItem: IntegrateObjectItemToDbParams["objectItem"] = {
      id: 1,
      otype_text: "Match Archive Filename",
      descr: "win.zip",
    };

    const result = await integrateObjectItemToDb({
      objectItem,
      direction: PROTECTION_DIRECTION_ENUM.IN,
      actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
    });

    console.log(result);
  });
});
