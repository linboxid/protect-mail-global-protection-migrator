export enum PROTECTION_WHAT_TYPE_ENUM {
  CONTENT_TYPE_FILTER = "content_type_filter",
  MATCH_FILENAME = "match_filename",
  ARCHIVE_FILTER = "archive_filter",
  MATCH_ARCHIVE_FILENAME = "match_archive_filename",
  SUBJECT_MATCH = "subject_match",
  SUBJECT_CONTAIN = "subject_contain",
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
