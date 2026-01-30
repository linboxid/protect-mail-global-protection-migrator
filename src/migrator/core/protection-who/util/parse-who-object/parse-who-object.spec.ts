import { parseWhoOjbect } from "./parse-who-object";
import { PROTECTION_WHO_TYPE_ENUM } from "@/constants.ts";
import { describe, expect, it } from "@jest/globals";
import type { GetListProtectionWhoResponse } from "@/migrator/service";

type ObjectItem = GetListProtectionWhoResponse["data"][0];

describe("parseWhoOjbect", () => {
  it("should parse REGEX type correctly", () => {
    const input = {
      id: 1,
      descr: "^test.*$",
      otype_text: "Regular Expression",
    };

    const result = parseWhoOjbect(input as any);

    expect(result).toEqual({
      id: 1,
      type: PROTECTION_WHO_TYPE_ENUM.REGEX,
      value: "^test.*$",
    });
  });

  it("should parse DOMAIN type correctly", () => {
    const input = {
      id: 2,
      descr: "example.com",
      otype_text: "Domain",
    };

    const result = parseWhoOjbect(input as any);

    expect(result).toEqual({
      id: 2,
      type: PROTECTION_WHO_TYPE_ENUM.DOMAIN,
      value: "example.com",
    });
  });

  it("should parse EMAIL type correctly", () => {
    const input = {
      id: 3,
      descr: "user@example.com",
      otype_text: "Mail address",
    };

    const result = parseWhoOjbect(input as any);

    expect(result).toEqual({
      id: 3,
      type: PROTECTION_WHO_TYPE_ENUM.EMAIL,
      value: "user@example.com",
    });
  });

  it("should parse IP type correctly", () => {
    const input = {
      id: 4,
      descr: "192.168.1.1",
      otype_text: "IP Address",
    };

    const result = parseWhoOjbect(input as any);

    expect(result).toEqual({
      id: 4,
      type: PROTECTION_WHO_TYPE_ENUM.IP,
      value: "192.168.1.1",
    });
  });

  it("should parse NETWORK type correctly", () => {
    const input = {
      id: 5,
      descr: "192.168.0.0/24",
      otype_text: "IP Network",
    };

    const result = parseWhoOjbect(input as any);

    expect(result).toEqual({
      id: 5,
      type: PROTECTION_WHO_TYPE_ENUM.NETWORK,
      value: "192.168.0.0/24",
    });
  });

  it("should fallback to OTHER type if otype_text is unknown", () => {
    const input = {
      id: 6,
      descr: "something-random",
      otype_text: "Unknown Type",
    };

    const result = parseWhoOjbect(input as any);

    expect(result).toEqual({
      id: 6,
      type: PROTECTION_WHO_TYPE_ENUM.OTHER,
      value: "something-random",
    });
  });

  it("should parse DOMAIN_WILDCARD when descr is a domain wildcard regex", () => {
    const input: ObjectItem = {
      id: 7,
      // adjust this if your wildcard format differs
      descr: "^[^@]+@[^.]+\.antispamcloud\.com$",
      otype_text: "Regular Expression",
    };

    const result = parseWhoOjbect(input as any);

    expect(result.type).toBe(PROTECTION_WHO_TYPE_ENUM.DOMAIN_WILDCARD);
    expect(result.id).toBe(7);
    expect(result.value).toBeTruthy(); // parsed domain from regex
  });
});
