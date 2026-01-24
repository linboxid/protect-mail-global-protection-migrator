export interface GetListProtectionWhoParams {
  whoContainerId: string; // Container Id in Proxmox -> Incoming - Global Blacklist
}

export interface GetListProtectionWhoResponse {}

/**
 * Get Protection Filter List by container
 * Like the protection list of Global - Protection - Blacklist - Incoming
 */
export const getListProtectionWho = () => {
}