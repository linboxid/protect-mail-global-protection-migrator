import { describe, expect, it } from "@jest/globals";
import { mapWhoType } from "@/migrator/core/protection-who/util/proxmox_otype_to_who_enum.ts";
import { PROTECTION_WHO_TYPE_ENUM } from "@/constants";

describe("mapWhoType", () => {
  it("maps Domain correctly", () => {
    expect(mapWhoType("Domain")).toBe(PROTECTION_WHO_TYPE_ENUM.DOMAIN);
  });

  it("maps Mail address correctly", () => {
    expect(mapWhoType("Mail address")).toBe(PROTECTION_WHO_TYPE_ENUM.EMAIL);
  });

  it("maps IP Address correctly", () => {
    expect(mapWhoType("IP Address")).toBe(PROTECTION_WHO_TYPE_ENUM.IP);
  });

  it("maps IP Network correctly", () => {
    expect(mapWhoType("IP Network")).toBe(PROTECTION_WHO_TYPE_ENUM.NETWORK);
  });

  it("maps Regular Expression correctly", () => {
    expect(mapWhoType("Regular Expression")).toBe(
      PROTECTION_WHO_TYPE_ENUM.REGEX,
    );
  });

  it("throws an error for unknown otype_text", () => {
    expect(() => mapWhoType("Unknown Type" as any)).toThrow(
      "Unhandled otype_text: Unknown Type",
    );
  });
});
