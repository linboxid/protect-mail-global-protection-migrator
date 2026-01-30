import { describe, expect, it } from "@jest/globals";
import { _isDomainWildcard } from "@/migrator/core/protection-who/util/parse-who-object/_is-domain-wild-card.ts";

describe("_isDomainWildcard", () => {
  it("returns true when both startFormat and endFormat are true", () => {
    const regexVal = "^[^@]+@[^.]+\\.$";
    const regexVal2 = "^[^@]+@[^.]+\\.testimboyo\\.site$";
    const regexVal3 = "^[^@]+@[^.]+\\.antispamcloud\\.com$";

    expect(_isDomainWildcard(regexVal)).toBe(true);
    expect(_isDomainWildcard(regexVal2)).toBe(true);
    expect(_isDomainWildcard(regexVal3)).toBe(true);
  });

  it("returns false when both startFormat and endFormat are false", () => {
    const regexVal = "random-string-not-matching";
    expect(_isDomainWildcard(regexVal)).toBe(false);
  });

  it("returns undefined when startFormat is true but endFormat is false", () => {
    const regexVal = "^[^@]+@[^.]+\\."; // no trailing $
    expect(_isDomainWildcard(regexVal)).toBe(false);
  });

  it("returns undefined when startFormat is false but endFormat is true", () => {
    const regexVal = "something$"; // ends with $, but doesn't start with pattern
    expect(_isDomainWildcard(regexVal)).toBe(false);
  });
});
