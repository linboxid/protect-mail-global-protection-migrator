import type { GetListProtectionWhatResponse } from "@/migrator/service";
import { PROTECTION_WHAT_TYPE_ENUM } from "@/constants.ts";

type ObjectItem = GetListProtectionWhatResponse["data"][0];

export type ParseWhatObject = {
  id: number;
  type: PROTECTION_WHAT_TYPE_ENUM;
  value: string;
};

/**
 * Extract the substring after the FIRST "=".
 * - "a=b=c" -> "b=c"
 * - "a=" -> ""
 * - "abc" -> "abc"
 */
function extractValueAfterFirstEquals(input?: string): string {
  const s = (input ?? "").trim();
  const idx = s.indexOf("=");
  return idx === -1 ? s : s.slice(idx + 1);
}

/**
 * Parses a Proxmox "What Object" item into the normalized payload used by
 * the Global Protection Filter DB.
 *
 * Rules:
 * - If `otype_text === "Match Field"`, keep the full `descr` as-is (it contains the field name / expression).
 * - For all other types, extract the portion AFTER the first "=" in `descr`.
 *   Example: "content-type=application/pdf" -> "application/pdf"
 *   If "=" is missing, fallback to the trimmed `descr`.
 *
 * @param objectItem - Raw Proxmox object item
 * @returns Normalized "what" object ready to persist
 */
export function parseWhatObject(objectItem: ObjectItem): ParseWhatObject {
  const { id, otype_text, descr } = objectItem;

  // Special case: this type expects the whole expression (field + value)
  if (otype_text === "Match Field") {
    return {
      id,
      type: PROTECTION_WHAT_TYPE_ENUM.MATCH_FIELD,
      value: (descr ?? "").trim(),
    };
  }

  const typeMap: Record<string, PROTECTION_WHAT_TYPE_ENUM> = {
    "Archive Filter": PROTECTION_WHAT_TYPE_ENUM.ARCHIVE_FILTER,
    "ContentType Filter": PROTECTION_WHAT_TYPE_ENUM.CONTENT_TYPE_FILTER,
    "Match Archive Filename": PROTECTION_WHAT_TYPE_ENUM.MATCH_ARCHIVE_FILENAME,
    "Match Filename": PROTECTION_WHAT_TYPE_ENUM.MATCH_FILENAME,
  };

  const parsedValue = extractValueAfterFirstEquals(descr);

  return {
    id,
    type: typeMap[otype_text] ?? PROTECTION_WHAT_TYPE_ENUM.OTHER,
    value: parsedValue,
  };
}
