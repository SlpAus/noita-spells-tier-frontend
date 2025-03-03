import axiosInstance from "../axiosConfig";
import { vote } from "../types/votingResult";
import { BACKEN_URL } from "../config";

export async function SendVoting(result: vote): Promise<string> {

    const response = await axiosInstance.post(`${BACKEN_URL}/api/vote/sendVoting`, result);
    return response.data;

}