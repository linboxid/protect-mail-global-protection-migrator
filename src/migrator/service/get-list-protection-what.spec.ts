import { describe, it } from "@jest/globals";
import { getListProtectionWhat } from "@/migrator/service/get-list-protection-what.ts";

describe("Get List Protection What", () => {
  it("Should return the list of protection what", async () => {
    const response = await getListProtectionWhat({
      whatContainerId: 529,
    });

    console.log(response.data);
  });
});
