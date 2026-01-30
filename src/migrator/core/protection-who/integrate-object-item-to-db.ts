import type { GetListProtectionWhoResponse } from "@/migrator/service";
import {
  PROTECTION_ACTION_TYPE_ENUM,
  type PROTECTION_DIRECTION_ENUM,
} from "@/constants.ts";
import { ProtectionFilterGlobalWhoRepository } from "@/repository/pg-main";
import { parseWhoOjbect } from "@/migrator/core/protection-who/util/parse-who-object/parse-who-object.ts";

export interface IntegrateObjectItemToDbParams {
  direction: PROTECTION_DIRECTION_ENUM;
  actionType: PROTECTION_ACTION_TYPE_ENUM;
  objectItem: GetListProtectionWhoResponse["data"][0];
}

export const integrateObjectItemToDb = async ({
  objectItem,
  actionType,
  direction,
}: IntegrateObjectItemToDbParams) => {
  const globalWhoRepository = new ProtectionFilterGlobalWhoRepository();
  const parsedObject = parseWhoOjbect(objectItem);
  const now = new Date().getTime();

  await globalWhoRepository.create({
    type: parsedObject.type,
    value: parsedObject.value,
    direction: direction,
    action_type: actionType,
    created_at: String(now),
    updated_at: String(now),
    proxmox_id: parsedObject.id,
  });
};
