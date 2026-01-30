export const _isDomainWildcard = (regexVal: string): boolean => {
  const startWithEscaped = "^[^@]+@[^.]+\\.";
  const startWithWithoutEscaped = "^[^@]+@[^.]+\.";

  const endFormat = regexVal.endsWith("$");

  const startWithIsTrue =
    regexVal.startsWith(startWithEscaped) ||
    regexVal.startsWith(startWithWithoutEscaped);

  return startWithIsTrue && endFormat;
};
