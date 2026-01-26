import { fetcher } from "@/migrator/fetcher";

export interface GetListProtectionWhatParams {
  whatContainerId: number; // Container Id in Proxmox -> Incoming - Global Blacklist
}

type ResponseData = {
  id: number;
  descr: string;
  otype_text:
    | "Archive Filter"
    | "ContentType Filter"
    | "Match Archive Filename"
    | "Match Filename"
    | "Match Field";
};

export interface GetListProtectionWhatResponse {
  data: ResponseData;
}

/**
 * Get Protection Filter List by container
 * Like the protection list of Global - Protection - Blacklist - Incoming
 */
export const getListProtectionWhat = async ({
  whatContainerId,
}: GetListProtectionWhatParams) => {
  const response = await fetcher<GetListProtectionWhatResponse>({
    endpoint: `/config/ruledb/what/${whatContainerId}/objects`,
    options: {
      method: "GET",
    },
  });

  return response.data;
};
