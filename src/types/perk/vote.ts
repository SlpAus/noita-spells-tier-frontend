import { VOTEResult } from "../votingResult";

/**
 * @description POST /api/perks/vote 的请求体
 */
export interface SubmitPerkVotePayload {
    perkA:    string;
    perkB:    string;
    result:    VOTEResult;
    pairId:    string;
    signature: string;
}