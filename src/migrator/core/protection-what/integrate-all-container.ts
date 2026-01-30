import { integrateContainer } from "@/migrator/core/protection-what/integrate-container.ts";
import { PROXMOX } from "@/config.ts";
import {
  PROTECTION_ACTION_TYPE_ENUM,
  PROTECTION_DIRECTION_ENUM,
} from "@/constants.ts";

export const integrateAllContainer = async () => {
  console.log("Integrating Global Protection Filter - WHAT");

  const incomingBlacklist = await integrateContainer({
    containerId: PROXMOX.globalProtectionFilter.what.incomingBlacklist,
    direction: PROTECTION_DIRECTION_ENUM.IN,
    actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
  });

  const incomingWhitelist = await integrateContainer({
    containerId: PROXMOX.globalProtectionFilter.what.incomingWhitelist,
    direction: PROTECTION_DIRECTION_ENUM.IN,
    actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
  });

  const outgoingBlacklist = await integrateContainer({
    containerId: PROXMOX.globalProtectionFilter.what.outgoingBlacklist,
    direction: PROTECTION_DIRECTION_ENUM.OUT,
    actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
  });

  const outgoingWhitelist = await integrateContainer({
    containerId: PROXMOX.globalProtectionFilter.what.outgoingWhitelist,
    direction: PROTECTION_DIRECTION_ENUM.OUT,
    actionType: PROTECTION_ACTION_TYPE_ENUM.BLACKLIST,
  });

  const totalItems =
    incomingBlacklist.totalAdded +
    incomingWhitelist.totalAdded +
    outgoingBlacklist.totalAdded +
    outgoingWhitelist.totalAdded;
  const totalFailed =
    incomingBlacklist.totalFailed +
    outgoingWhitelist.totalFailed +
    outgoingBlacklist.totalFailed +
    outgoingWhitelist.totalFailed;

  console.log(
    `Finish - Integrating Global Protection Filter - WHAT. With Total Item ${totalItems} and Failed: ${totalFailed}`,
  );
};
