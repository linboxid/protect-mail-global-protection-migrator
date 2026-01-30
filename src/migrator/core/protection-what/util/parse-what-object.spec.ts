import { parseWhatObject } from "@/migrator/core/protection-what/util/parse-what-object.ts";
import { PROTECTION_WHAT_TYPE_ENUM } from "@/constants.ts";
import { describe, expect, it } from "@jest/globals";
import type { GetListProtectionWhatResponse } from "@/migrator/service";

type ObjectItem = GetListProtectionWhatResponse["data"][0];

describe("parseWhatObject", () => {
  it('returns MATCH_FIELD and keeps full descr (trimmed) when otype_text is "Match Field"', () => {
    const input: ObjectItem = {
      id: 1,
      otype_text: "Match Field",
      descr: "  content-type=application/pdf  ",
    };

    const result = parseWhatObject(input);

    expect(result).toEqual({
      id: 1,
      type: PROTECTION_WHAT_TYPE_ENUM.MATCH_FIELD,
      value: "content-type=application/pdf",
    });
  });

  it('extracts value after first "=" for ContentType Filter', () => {
    const input: ObjectItem = {
      id: 2,
      otype_text: "ContentType Filter",
      descr: "content-type=application/pdf",
    };

    const result = parseWhatObject(input);

    expect(result).toEqual({
      id: 2,
      type: PROTECTION_WHAT_TYPE_ENUM.CONTENT_TYPE_FILTER,
      value: "application/pdf",
    });
  });

  it('extracts value after first "=" and keeps remaining "=" (a=b=c -> b=c)', () => {
    const input: ObjectItem = {
      id: 3,
      otype_text: "Match Filename",
      descr: "a=b=c",
    };

    const result = parseWhatObject(input);

    expect(result).toEqual({
      id: 3,
      type: PROTECTION_WHAT_TYPE_ENUM.MATCH_FILENAME,
      value: "b=c",
    });
  });

  it('returns empty string when descr ends with "=" (a= -> "")', () => {
    const input: ObjectItem = {
      id: 4,
      otype_text: "Archive Filter",
      descr: "a=",
    };

    const result = parseWhatObject(input);

    expect(result).toEqual({
      id: 4,
      type: PROTECTION_WHAT_TYPE_ENUM.ARCHIVE_FILTER,
      value: "",
    });
  });

  it('falls back to trimmed descr when "=" is missing', () => {
    const input: ObjectItem = {
      id: 5,
      otype_text: "Match Archive Filename",
      descr: "   no-equals-here   ",
    };

    const result = parseWhatObject(input);

    expect(result).toEqual({
      id: 5,
      type: PROTECTION_WHAT_TYPE_ENUM.MATCH_ARCHIVE_FILENAME,
      value: "no-equals-here",
    });
  });

  it("handles undefined descr safely (non-Match Field)", () => {
    const input = {
      id: 6,
      otype_text: "Match Filename" as const,
      descr: undefined,
    };

    const result = parseWhatObject(input as any);

    expect(result).toEqual({
      id: 6,
      type: PROTECTION_WHAT_TYPE_ENUM.MATCH_FILENAME,
      value: "",
    });
  });

  it("maps unknown otype_text to OTHER", () => {
    const input = {
      id: 7,
      otype_text: "Some New Type" as any,
      descr: "x=y",
    };

    const result = parseWhatObject(input as any);

    expect(result).toEqual({
      id: 7,
      type: PROTECTION_WHAT_TYPE_ENUM.OTHER,
      value: "y",
    });
  });

  it("trims input before parsing (spaces around key/value)", () => {
    const input = {
      id: 8,
      otype_text: "ContentType Filter" as const,
      descr: "   content-type=application/pdf   ",
    };

    const result = parseWhatObject(input as any);

    // Note: your helper trims the whole string, then slices after "=",
    // so the value won't have trailing spaces.
    expect(result).toEqual({
      id: 8,
      type: PROTECTION_WHAT_TYPE_ENUM.CONTENT_TYPE_FILTER,
      value: "application/pdf",
    });
  });
});
