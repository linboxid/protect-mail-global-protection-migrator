import type { GetListProtectionWhatResponse } from "@/migrator/service";
import { ProtectionFilterGlobalWhatRepository } from "@/repository/pg-main";
import { parseWhatObject } from "@/migrator/core/protection-what/util/parse-what-object.ts";
import {
  PROTECTION_ACTION_TYPE_ENUM,
  type PROTECTION_DIRECTION_ENUM,
} from "@/constants.ts";

export interface IntegrateObjectItemToDbParams {
  direction: PROTECTION_DIRECTION_ENUM;
  actionType: PROTECTION_ACTION_TYPE_ENUM;
  objectItem: GetListProtectionWhatResponse["data"][0];
}

export const integrateObjectItemToDb = async ({
  objectItem,
  actionType,
  direction,
}: IntegrateObjectItemToDbParams) => {
  const globalWhatRepository = new ProtectionFilterGlobalWhatRepository();
  const parsedObject = parseWhatObject(objectItem);
  const now = new Date().getTime();

  await globalWhatRepository.create({
    type: parsedObject.type,
    value: parsedObject.value,
    direction: direction,
    action_type: actionType,
    created_at: String(now),
    updated_at: String(now),
    proxmox_id: parsedObject.id,
  });

  return 1;
};
