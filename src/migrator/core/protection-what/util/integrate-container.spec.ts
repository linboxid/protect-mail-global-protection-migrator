import { describe, it } from "@jest/globals";
import { integrateContainer } from "@/migrator/core/protection-what/integrate-container.ts";
import {
  PROTECTION_ACTION_TYPE_ENUM,
  PROTECTION_DIRECTION_ENUM,
} from "@/constants.ts";
import { PROXMOX } from "@/config.ts";

describe("Integrate Container", () => {
  it("Should integrate all list in container into DB with correct result", async () => {
    const result = await integrateContainer({
      actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
      direction: PROTECTION_DIRECTION_ENUM.IN,
      containerId: PROXMOX.globalProtectionFilter.what.incomingBlacklist,
    });

    console.log(result);
  });
});
