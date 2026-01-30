import type { GetListProtectionWhoResponse } from "@/migrator/service";
import { PROTECTION_WHO_TYPE_ENUM } from "@/constants.ts";
import { _isDomainWildcard } from "@/migrator/core/protection-who/util/parse-who-object/_is-domain-wild-card.ts";
import { _parseDomainWildcardFromRegex } from "@/migrator/core/protection-who/util/parse-who-object/_parse-domain-wildcard-from-regex.ts";

type ObjectItem = GetListProtectionWhoResponse["data"][0];

export type ParseWhoOjbect = {
  id: number;
  type: PROTECTION_WHO_TYPE_ENUM;
  value: string;
};

export function parseWhoOjbect({
  id,
  otype_text,
  descr,
}: ObjectItem): ParseWhoOjbect {
  if (_isDomainWildcard(descr)) {
    return {
      id: id,
      type: PROTECTION_WHO_TYPE_ENUM.DOMAIN_WILDCARD,
      value: _parseDomainWildcardFromRegex(descr),
    };
  }

  const typeMap: Record<ObjectItem["otype_text"], PROTECTION_WHO_TYPE_ENUM> = {
    "Regular Expression": PROTECTION_WHO_TYPE_ENUM.REGEX,
    Domain: PROTECTION_WHO_TYPE_ENUM.DOMAIN,
    "Mail address": PROTECTION_WHO_TYPE_ENUM.EMAIL,
    "IP Address": PROTECTION_WHO_TYPE_ENUM.IP,
    "IP Network": PROTECTION_WHO_TYPE_ENUM.NETWORK,
  };

  return {
    id,
    type: typeMap[otype_text] ?? PROTECTION_WHO_TYPE_ENUM.OTHER,
    value: descr,
  };
}
