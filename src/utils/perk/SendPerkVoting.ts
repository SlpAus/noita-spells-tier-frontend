import { perkApi } from "../../axiosConfig";
import { SubmitPerkVotePayload } from "../../types/perk/vote";
import { SubmitPerkVotePayloadSchema } from "../../types/perk/zodPerkSchemas";
import { z, ZodError } from "zod";

export async function SendPerkVoting(payload: SubmitPerkVotePayload): Promise<void> {
    try {
        // Validate the payload before sending
        const validatedPayload = SubmitPerkVotePayloadSchema.parse(payload);
        await perkApi.post("/api/perks/vote", validatedPayload);
        // No response body validation needed, as we expect a successful status code
        // to indicate success. Axios will throw for non-2xx responses.
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in outgoing payload (SendPerkVoting):", z.treeifyError(error));
            throw new Error("发送给服务器的投票数据格式不正确。");
        }
        // Re-throw other errors, including Axios errors for non-2xx responses
        throw error;
    }
}
