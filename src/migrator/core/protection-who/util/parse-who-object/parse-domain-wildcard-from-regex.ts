export const _parseDomainFromRegex = (regexVal: string): string => {
  const prefix = "^[^@]+@[^.]+\\.";

  // must start with the expected prefix
  if (!regexVal.startsWith(prefix)) {
    return "";
  }

  // strip prefix and trailing $
  const rawDomain = regexVal.replace(prefix, "").replace(/\$$/, "");

  // if it's just a wildcard dot, return empty
  if (rawDomain === "") {
    return "";
  }

  // unescape dots
  return rawDomain.replace(/\\\./g, ".");
};
