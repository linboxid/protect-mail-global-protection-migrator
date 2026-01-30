import {
  PROTECTION_ACTION_TYPE_ENUM,
  PROTECTION_DIRECTION_ENUM,
} from "@/constants.ts";
import { PROXMOX } from "@/config.ts";
import { integrateContainer } from "@/migrator/core/protection-what/integrate-container.ts";

export const integrateAllContainer = async () => {
  console.log("Integrating Global Protection Filter - WHAT");

  const mappings = [
    {
      id: PROXMOX.globalProtectionFilter.what.incomingBlacklist,
      direction: PROTECTION_DIRECTION_ENUM.IN,
      actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
    },
    {
      id: PROXMOX.globalProtectionFilter.what.incomingWhitelist,
      direction: PROTECTION_DIRECTION_ENUM.IN,
      actionType: PROTECTION_ACTION_TYPE_ENUM.WHITELIST,
    },
    {
      id: PROXMOX.globalProtectionFilter.what.outgoingBlacklist,
      direction: PROTECTION_DIRECTION_ENUM.OUT,
      actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
    },
    {
      id: PROXMOX.globalProtectionFilter.what.outgoingWhitelist,
      direction: PROTECTION_DIRECTION_ENUM.OUT,
      actionType: PROTECTION_ACTION_TYPE_ENUM.WHITELIST,
    },
  ];

  const results = await Promise.all(
    mappings.map((m) =>
      integrateContainer({
        containerId: m.id,
        direction: m.direction,
        actionType: m.actionType,
      }),
    ),
  );

  const totalItems = results.reduce((sum, r) => sum + r.totalAdded, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.totalFailed, 0);

  console.log(
    `Finish - Integrating Global Protection Filter - WHO. With Total Item ${totalItems} and Failed: ${totalFailed}`,
  );
};
