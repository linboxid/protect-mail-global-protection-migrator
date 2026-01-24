import { ServerRepository } from "@/repository/pg-app";
import { CacheModel } from "@/repository/redis";
import { CACHE_KEY_ENUM } from "@/constants.ts";
import axios from "axios";
import { buildProxmoxUrl } from "@/migrator/util/build-proxmox-url.ts";
import { fetcherAgent } from "@/migrator/util/fetcher-agent.ts";

type ProxmoxLoginResponse = {
  data: {
    role: string;
    username: string;
    ticket: string;
    CSRFPreventionToken: string;
  };
};

type ReturnType = {
  csrfToken: string;
  ticket: string;
};

type CredentialCache = {
  csrfToken: string;
  ticket: string;
};

export const _login = async (): Promise<ReturnType> => {
  const serverRepository = new ServerRepository();
  const cacheModel = new CacheModel();

  const masterServer = await serverRepository.getMaster();

  if (!masterServer) {
    throw new Error("Master does not exist");
  }

  const credentialCache = await cacheModel.get<CredentialCache>(
    CACHE_KEY_ENUM.PROXMOX_CREDENTIAL,
  );

  if (credentialCache) {
    return credentialCache;
  }

  const response = await axios.post<ProxmoxLoginResponse>(
    buildProxmoxUrl({
      path: "/access/ticket",
      masterServerUrl: masterServer.url,
    }),
    {
      username: masterServer.auth_username,
      password: masterServer.auth_password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: fetcherAgent,
    },
  );

  if (response.status !== 200 || !response.data) {
    throw new Error(
      `Proxmox API request failed wit status ${response.statusText}  - ${response.status} \n`,
    );
  }

  const { data } = response;

  const csrfToken = data.data.CSRFPreventionToken;
  const ticket = data.data.ticket;

  await cacheModel.set<CredentialCache>(CACHE_KEY_ENUM.PROXMOX_CREDENTIAL, {
    csrfToken,
    ticket,
  });

  return {
    csrfToken,
    ticket,
  };
};
