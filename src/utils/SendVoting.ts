// 发送投票结果给后端

// post /api/vote/sendVoting
import axiosInstance from "../axiosConfig";
import { vote, } from "../types/votingResult";
import { BACKEN_URL } from "../config";

export async function SendVoting(result: vote): Promise<boolean> {
    try {
        const response = await axiosInstance.post(`${BACKEN_URL}/api/vote/sendVoting`, result);
        return response.status === 200;
    } catch (error) {
        console.error("Error sending vote:", error);
        return false;
    }
}