import { pgMainConn } from "@/db";
import { BasePgRepository } from "@/repository/base-pg-repository.ts";
import {
  PROTECTION_ACTION_TYPE_ENUM,
  PROTECTION_DIRECTION_ENUM,
  type PROTECTION_WHAT_TYPE_ENUM,
} from "@/constants.ts";

export interface ProtectionFilterGlobalWhatParams {
  type: PROTECTION_WHAT_TYPE_ENUM;
  value: string;
  direction: PROTECTION_DIRECTION_ENUM;
  action_type: PROTECTION_ACTION_TYPE_ENUM;
  created_at: string;
  updated_at: string;
  proxmox_id: number;
}

export class ProtectionFilterGlobalWhatRepository extends BasePgRepository {
  constructor() {
    super(pgMainConn, "protection_filter_global_what");
  }

  async addOne({
    type,
    value,
    direction,
    action_type,
    created_at,
    updated_at,
    proxmox_id,
  }: ProtectionFilterGlobalWhatParams) {
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
