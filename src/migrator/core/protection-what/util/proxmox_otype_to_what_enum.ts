import type { GetListProtectionWhatResponse } from "@/migrator/service";
import type { PROTECTION_WHAT_TYPE_ENUM } from "@/constants.ts";

type ObjectItem = GetListProtectionWhatResponse["data"][0];

export type MapWhatObjectReturn = {
  id: number;
  type: PROTECTION_WHAT_TYPE_ENUM;
  value: string;
};

export function mapWhatObject(otypeText: ObjectItem["otype_text"]) {
  return "";
}
