import { PairedPerk } from "./perk";

/**
 * @description GET /api/perks/pair 的响应体
 */
export interface GetPerkPairAPIResponse {
    perkA:    PairedPerk;
    perkB:    PairedPerk;
    pairId:    string;
    signature: string;
}