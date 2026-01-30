export const _isDomainWildcard = (regexVal: string): boolean => {
  const startFormat = regexVal.startsWith("^[^@]+@[^.]+\\.");
  const endFormat = regexVal.endsWith("$");

  return startFormat && endFormat;
};
