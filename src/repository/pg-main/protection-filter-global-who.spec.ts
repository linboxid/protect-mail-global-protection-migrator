import { describe, it } from "@jest/globals";
import { ProtectionFilterGlobalWhoRepository } from "@/repository/pg-main/protection-filter-global-who.ts";
import { PROTECTION_WHO_TYPE_ENUM } from "@/constants.ts";

describe("Protection Filter Global who", () => {
  it("Should be able to update global who", async () => {
    const now = new Date().getTime();

    const protectionFilterGlobalWho = new ProtectionFilterGlobalWhoRepository();

    const result = await protectionFilterGlobalWho.create({
      type: PROTECTION_WHO_TYPE_ENUM.DOMAIN,
      value: "test-naruto.com",
      direction: "in",
      action_type: "blacklist",
      created_at: String(now),
      updated_at: String(now),
      proxmox_id: 1,
    });

    console.log(result);
  });
});
