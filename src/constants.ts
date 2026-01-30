import "dotenv/config";

export const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

export const APP_NAME = "protection-global-migrator";

export enum PROTECTION_WHAT_TYPE_ENUM {
  CONTENT_TYPE_FILTER = "content_type_filter",
  MATCH_FILENAME = "match_filename",
  ARCHIVE_FILTER = "archive_filter",
  MATCH_ARCHIVE_FILENAME = "match_archive_filename",
  MATCH_FIELD = "match_field",
  OTHER="OTHER",
}

export enum CACHE_KEY_ENUM {
  PROXMOX_CREDENTIAL = `${APP_NAME}-proxmox-credential`,
}

export enum PROTECTION_WHO_TYPE_ENUM {
  DOMAIN = "domain",
  EMAIL = "email",
  IP = "ip",
  NETWORK = "network",
  REGEX = "regex",
  DOMAIN_WILDCARD = "domain_wildcard",
}

export enum PROTECTION_ACTION_TYPE_ENUM {
  WHITELIST = "whitelist",
  BLACKLIST = "blacklist",
}

export enum PROTECTION_DIRECTION_ENUM {
  IN = "in",
  OUT = "out",
}
