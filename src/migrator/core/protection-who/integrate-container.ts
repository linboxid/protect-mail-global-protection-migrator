import {
  PROTECTION_ACTION_TYPE_ENUM,
  type PROTECTION_DIRECTION_ENUM,
} from "@/constants.ts";
import { getListProtectionWho } from "@/migrator/service";
import { integrateObjectItemToDb } from "@/migrator/core/protection-who/integrate-object-item-to-db.ts";

interface Params {
  containerId: number; // For example, the ID of Incoming - Global Blacklist Container
  direction: PROTECTION_DIRECTION_ENUM;
  actionType: PROTECTION_ACTION_TYPE_ENUM;
}

export const integrateContainer = async ({
  containerId,
  direction,
  actionType,
}: Params) => {
  console.log(
    `Integrating Cointainer - ID: ${containerId} - Direction: ${direction} - Action: ${actionType}`,
  );

  const objectList = await getListProtectionWho({
    whoContainerId: containerId,
  });

  let totalAdded = 0;
  let totalFailed = 0;

  // Insert it one by one into db
  for (const item of objectList.data) {
    try {
      await integrateObjectItemToDb({
        objectItem: item,
        direction,
        actionType,
      });

      totalAdded++;
    } catch (error: unknown) {
      totalFailed++;
      console.log(
        `Error while integrating Cointainer - ${item} - ${String(error)}`,
      );
    }
  }

  console.log(
    `Finish Integrating Cointainer - ID: ${containerId} - Direction: ${direction} - Action: ${actionType} - Total Added: ${totalAdded}`,
  );

  return {
    totalAdded,
    totalFailed,
  };
};
