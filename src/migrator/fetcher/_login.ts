import { type ServerServerNode } from "@/repository/pg-app";
import { CacheModel } from "@/repository/redis";
import { CACHE_KEY_ENUM } from "@/constants.ts";
import axios from "axios";
import { fetcherAgent, buildProxmoxUrl } from "@/migrator/util";

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

type Params = {
  masterServer: ServerServerNode;
};

const EXPIRE_CREDENTIAL_PROXMOX = 10 * 60; // 10 Minutes in Second

export const _login = async ({ masterServer }: Params): Promise<ReturnType> => {
  if (masterServer.type !== "master") {
    throw new Error("Please pass a master server in serverNode");
  }

  const cacheModel = new CacheModel();

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
      realm: "pmg",
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

  await cacheModel.set<CredentialCache>({
    key: CACHE_KEY_ENUM.PROXMOX_CREDENTIAL,
    ttlSeconds: EXPIRE_CREDENTIAL_PROXMOX,
    value: {
      csrfToken,
      ticket,
    },
  });

  return {
    csrfToken,
    ticket,
  };
};
