import { PairedSpell } from "./spell";

/**
 * @description GET /api/spells/pair 的响应体
 */
export interface GetPairAPIResponse {
    spellA:    PairedSpell;
    spellB:    PairedSpell;
    pairId:    string;
    signature: string;
}