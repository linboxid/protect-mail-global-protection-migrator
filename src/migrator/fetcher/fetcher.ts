import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { ServerRepository } from "@/repository/pg-app/server.ts";

export type Params = {
  endpoint: string;
  options?: AxiosRequestConfig;
};

export async function fetcher<T>({
  endpoint,
  options,
}: Params): Promise<AxiosResponse<T>> {
  const serverRepository = new ServerRepository();

  const masterServer = await serverRepository.getMaster();

  if (!masterServer) {
    throw new Error("Missing Master Server");
  }
}
