import { fetcher } from "@/migrator/fetcher";

export interface GetListProtectionWhoParams {
  whoContainerId: number; // Container Id in Proxmox -> Incoming - Global Blacklist
}

type ResponseData = {
  id: number;
  descr: string;
  otype_text:
    | "Regular Expression"
    | "Domain"
    | "Mail address"
    | "IP Address"
    | "IP Network";
};

export interface GetListProtectionWhoResponse {
  data: ResponseData[];
}

/**
 * Get Protection Filter List by container
 * Like the protection list of Global - Protection - Blacklist - Incoming
 */
export const getListProtectionWho = async ({
  whoContainerId,
}: GetListProtectionWhoParams) => {
  const response = await fetcher<GetListProtectionWhoResponse>({
    endpoint: `/config/ruledb/who/${whoContainerId}/objects`,
    options: {
      method: "GET",
    },
  });

  return response.data;
};
