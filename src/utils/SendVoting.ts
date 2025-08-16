import axiosInstance from "../axiosConfig";
import { SubmitVotePayload } from "../types/vote";
import { BACKEN_URL } from "../config";
import { SubmitVotePayloadSchema } from "../types/zodSchemas";
import { z, ZodError } from "zod";

export async function SendVoting(payload: SubmitVotePayload): Promise<void> {
    try {
        // Validate the payload before sending
        const validatedPayload = SubmitVotePayloadSchema.parse(payload);
        await axiosInstance.post(`${BACKEN_URL}/api/vote`, validatedPayload);
        // No response body validation needed, as we expect a successful status code
        // to indicate success. Axios will throw for non-2xx responses.
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in outgoing payload (SendVoting):", z.treeifyError(error));
            throw new Error("发送给服务器的投票数据格式不正确。");
        }
        // Re-throw other errors, including Axios errors for non-2xx responses
        throw error;
    }
}