import { describe, it } from "@jest/globals";
import { getListProtectionWho } from "@/migrator/service/get-list-protection-who.ts";

describe("Get List Protection Who", () => {
  it("Should return the list of protection who", async () => {
    const response = await getListProtectionWho({
      whoContainerId: 25,
    });

    console.log(response.data);
  });
});
