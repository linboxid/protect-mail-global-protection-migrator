import { PROTECTION_WHO_TYPE_ENUM } from "@/constants.ts";
import type { GetListProtectionWhoResponse } from "@/migrator/service";

type ObjectItem = GetListProtectionWhoResponse["data"][0];

export function mapWhoType(
  otypeText: ObjectItem["otype_text"],
): PROTECTION_WHO_TYPE_ENUM {
  switch (otypeText) {
    case "Domain":
      return PROTECTION_WHO_TYPE_ENUM.DOMAIN;
    case "Mail address":
      return PROTECTION_WHO_TYPE_ENUM.EMAIL;
    case "IP Address":
      return PROTECTION_WHO_TYPE_ENUM.IP;
    case "IP Network":
      return PROTECTION_WHO_TYPE_ENUM.NETWORK;
    case "Regular Expression":
      return PROTECTION_WHO_TYPE_ENUM.REGEX;
    default: {
      // Exhaustive check — TS will error if a new type is added and not handled
      throw new Error(`Unhandled otype_text: ${otypeText}`);
    }
  }
}
