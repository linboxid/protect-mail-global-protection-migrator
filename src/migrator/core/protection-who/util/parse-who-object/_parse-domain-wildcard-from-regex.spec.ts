import { describe, expect, it } from "@jest/globals";
import {
  _parseDomainWildcardFromRegex
} from "@/migrator/core/protection-who/util/parse-who-object/_parse-domain-wildcard-from-regex.ts";

describe("Parse Domain Regex", () => {
  it("returns empty string for wildcard domain format", () => {
    const regexVal = "^[^@]+@[^.]+\\.$";
    expect(_parseDomainWildcardFromRegex(regexVal)).toBe("");
  });

  it("parses testimboyo.site", () => {
    const regexVal = "^[^@]+@[^.]+\\.testimboyo\\.site$";
    expect(_parseDomainWildcardFromRegex(regexVal)).toBe("testimboyo.site");
  });

  it("parses antispamcloud.com", () => {
    const regexVal = "^[^@]+@[^.]+\\.antispamcloud\\.com$";
    expect(_parseDomainWildcardFromRegex(regexVal)).toBe("antispamcloud.com");
  });

  it("returns empty string if string doesn't match expected prefix", () => {
    const regexVal = "something-else";
    expect(_parseDomainWildcardFromRegex(regexVal)).toBe("");
  });

  it("returns empty string if it has prefix but no domain and no $", () => {
    const regexVal = "^[^@]+@[^.]+\\.";
    expect(_parseDomainWildcardFromRegex(regexVal)).toBe("");
  });
});
