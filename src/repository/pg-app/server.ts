import { BasePgRepository } from "@/repository/base-pg-repository.ts";
import { pgAppConn } from "@/db";

export interface ServerServerNode {
  uuid: string;
  name: string;
  status: "online" | "offline" | string; // Using a union if there are specific states
  type: "master" | "worker" | string; // Adjusted based on the 'master' value
  url: string;
  auth_username: string;
  auth_password: string;
  note: string;
  created_at: string; // Represented as string in your JSON
  updated_at: string;
}

export class ServerRepository extends BasePgRepository {
  constructor() {
    super(pgAppConn, "server");
  }

  async getMaster() {
    return await this.findOne<ServerServerNode>({
      type: "master",
    });
  }
}
