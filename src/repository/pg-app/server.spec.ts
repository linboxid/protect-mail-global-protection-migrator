import { describe, it } from "@jest/globals";
import { ServerRepository } from "@/repository/pg-app/server.ts";

describe("pgAppServer", () => {
  it("Should get the master server", async () => {
    const serverRepo = new ServerRepository();

    const result = await serverRepo.getMaster();
    if (!result) {
      console.warn(`Failed to get master server`);
    } else {
      console.log(result.url);
    }
  });
});
