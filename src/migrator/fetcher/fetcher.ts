import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { ServerRepository } from "@/repository/pg-app/server.ts";
import { _login } from "@/migrator/fetcher/_login.ts";
import { buildProxmoxUrl, fetcherAgent } from "@/migrator/util";

export type Params = {
  endpoint: string;
  options?: AxiosRequestConfig;
};

/*
The Endpoint should have / at first, for example `/logout`
 */
export async function fetcher<T>({
  endpoint,
  options,
}: Params): Promise<AxiosResponse<T>> {
  const serverRepository = new ServerRepository();

  const masterServer = await serverRepository.getMaster();

  if (!masterServer) {
    throw new Error("Missing Master Server");
  }

  const credential = await _login({
    masterServer: masterServer,
  });

  const fullUrl = buildProxmoxUrl({
    path: endpoint,
    masterServerUrl: masterServer.url,
  });

  return await axios.request<T>({
    ...options,
    url: fullUrl,
    headers: {
      "Content-Type": "application/json",
      CSRFPreventionToken: credential.csrfToken,
      Authorization: `PMGAuthCookie=${credential.ticket}`,
    },
    httpsAgent: fetcherAgent,
    validateStatus: (status) => status >= 200 && status < 300,
  });
}
