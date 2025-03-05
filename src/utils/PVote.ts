import axiosInstance from "../axiosConfig";
import { BACKEN_URL } from "../config";

export interface Pvote {
    winner: number; //定向投票的胜者
    loser: number; //定向投票的失败者
    description: string; // 定向投票的理由
}

export async function SendPvote(result: Pvote): Promise<string> {

    const response = await axiosInstance.post(`${BACKEN_URL}/api/vote/Pvote`, result);
    return response.data;

}

interface PvoteNum {
    pvoteNum: number;
}

export async function GetPvoteNum(): Promise<PvoteNum> {
    const response = await axiosInstance.get(`${BACKEN_URL}/api/vote/GetPvoteNum`);
    return response.data;
}

interface PvoteRecords {
    pvoteRecords: Pvote[];

}

export async function GetPvoteRecords(): Promise<PvoteRecords> {
    const response = await axiosInstance.get(`${BACKEN_URL}/api/vote/GetPvoteRecords`);
    return response.data;
}