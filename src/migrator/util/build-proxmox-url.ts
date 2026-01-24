export type Params = {
  path: string;
  masterServerUrl: string;
};

export function buildProxmoxUrl({ path, masterServerUrl }: Params): string {
  return `${masterServerUrl}/api2/json${path}`;
}
