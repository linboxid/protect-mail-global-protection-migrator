import { describe, it, expect } from "@jest/globals";
import { _login } from "@/migrator/fetcher/_login.ts";

describe("Login", () => {
  it("Should return the login credential info", () => {
    const result = _login();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("csrfToken");
    expect(result).toHaveProperty("ticket");
  });
});
