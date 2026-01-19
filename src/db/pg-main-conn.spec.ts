import { describe, it } from "@jest/globals";
import { pgMainConn } from "@/db/pg-main-conn";

describe("Pg-MainConn", () => {
  it("Should Connect to new main pg", async () => {
    const now = new Date().getTime();

    await pgMainConn.query(`
      INSERT INTO protection_filter_global_what (type, value, direction, action_type, created_at, updated_at,
                                                 proxmox_id)
      VALUES ('archive-filter', '.pdf', 'in', 'blacklist', '${now}', '${now}', 1)
    `);
  });
});
