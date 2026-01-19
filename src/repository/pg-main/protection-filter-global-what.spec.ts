import { describe, it } from "@jest/globals";
import { ProtectionFilterGlobalWhatRepository } from "@/repository/pg-main/protection-filter-global-what.ts";
import { PROTECTION_WHAT_TYPE_ENUM } from "@/constants.ts";

describe("Protection Filter Global What", () => {
  it("Should be able to update global what", async () => {
    const now = new Date().getTime();

    const protectionFilterGlobalWhat =
      new ProtectionFilterGlobalWhatRepository();

    const result = await protectionFilterGlobalWhat.create({
      type: PROTECTION_WHAT_TYPE_ENUM.CONTENT_TYPE_FILTER,
      value: ".pdf",
      direction: "in",
      action_type: "blacklist",
      created_at: String(now),
      updated_at: String(now),
      proxmox_id: 1,
    });

    console.log(result);
  });
});
