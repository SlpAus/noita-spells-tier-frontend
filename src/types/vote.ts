import { VOTEResult } from "./votingResult";

/**
 * @description POST /api/vote 的请求体
 */
export interface SubmitVotePayload {
    spellA:    string;
    spellB:    string;
    result:    VOTEResult;
    pairId:    string;
    signature: string;
}