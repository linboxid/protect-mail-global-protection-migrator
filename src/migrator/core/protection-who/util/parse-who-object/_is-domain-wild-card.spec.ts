import { describe, expect, it } from "@jest/globals";
import { _isDomainWildcard } from "@/migrator/core/protection-who/util/parse-who-object/_is-domain-wild-card.ts";
import { getListProtectionWho } from "@/migrator/service";

describe("_isDomainWildcard", () => {
  it("returns true when both startFormat and endFormat are true", () => {
    const regexVal = "^[^@]+@[^.]+\\.$";
    const regexVal2 = "^[^@]+@[^.]+\\.testimboyo\\.site$";
    const regexVal3 = "^[^@]+@[^.]+\\.antispamcloud\\.com$";
    const regexVal4 = "^[^@]+@[^.]+\.antispamcloud\.com$";

    expect(_isDomainWildcard(regexVal)).toBe(true);
    expect(_isDomainWildcard(regexVal2)).toBe(true);
    expect(_isDomainWildcard(regexVal3)).toBe(true);
    expect(_isDomainWildcard(regexVal4)).toBe(true);
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

describe("Integration Test - With Real Data from API", () => {
  it("Should Return true for Domain Wildcard and false for the other", async () => {
    const response = await getListProtectionWho({
      whoContainerId: 25,
    });

    const withDomainWildcard = response.data.map((item) => {
      return {
        ...item,
        isDomainWildcard: _isDomainWildcard(item.descr),
      };
    });

    const ilistDomainWildcard = withDomainWildcard.filter((item) => {
      return item.isDomainWildcard;
    });

    // Currently it should 2. Its following real data in proxmox
    console.log(ilistDomainWildcard.length);
    console.log(ilistDomainWildcard);
  });
});
