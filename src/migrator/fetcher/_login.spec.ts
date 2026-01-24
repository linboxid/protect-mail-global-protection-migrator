import { describe, it, expect } from "@jest/globals";
import { _login } from "@/migrator/fetcher/_login.ts";
import { ServerRepository } from "@/repository/pg-app";

describe("Login", () => {
  it("Should return the login credential info", async () => {
    const serverRepository = new ServerRepository();
    const masterServer = await serverRepository.getMaster();

    if (!masterServer) {
      throw new Error("Missing server master");
    }

    const result = await _login({
      serverNode: masterServer,
    });

    expect(result).toBeDefined();
    console.log(result);
  });
});
