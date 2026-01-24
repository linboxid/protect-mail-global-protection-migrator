import { describe, it } from "@jest/globals";
import { fetcher } from "@/migrator/fetcher/fetcher.ts";

describe("Fetcher", () => {
  it("Should fetch data from proxmox API", async () => {
    const response = await fetcher({
      endpoint: "/nodes/mgw-dev/postfix/qshape",
    });

    console.log(response.data);
  });
});
