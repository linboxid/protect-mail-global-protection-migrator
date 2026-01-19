import {
  PROTECTION_ACTION_TYPE_ENUM,
  PROTECTION_DIRECTION_ENUM,
  type PROTECTION_WHO_TYPE_ENUM,
} from "@/constants.ts";
import { BaseRepository } from "@/repository/base-repository.ts";
import { pgMainConn } from "@/db/pg-main-conn.ts";

export interface AddOneParams {
  type: PROTECTION_WHO_TYPE_ENUM;
  value: string;
  direction: PROTECTION_DIRECTION_ENUM;
  action_type: PROTECTION_ACTION_TYPE_ENUM;
  created_at: string;
  updated_at: string;
  proxmox_id: number;
}

export class ProtectionFilterGlobalWhoRepository extends BaseRepository {
  constructor() {
    super(pgMainConn, "protection_filter_global_who");
  }

  async addOne({
    type,
    value,
    direction,
    action_type,
    created_at,
    updated_at,
    proxmox_id,
  }: AddOneParams) {
    return this.create({
      type,
      value,
      direction,
      action_type,
      created_at,
      updated_at,
      proxmox_id,
    });
  }
}
