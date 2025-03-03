import axiosInstance from "../axiosConfig";
import { BACKEN_URL } from "../config";


interface myvote {
    winner: number;
    loser: number;
    weight: number;
    CreatedAt: string;
}

export interface MyRankData {
    total_votes: number; // 自己总共投票的次数
    most_voted_times: number; // 自己最多投票的次数
    most_voted_item: number; //自己最多投票的道具id
    matching_rate: number; // 自己投票和总榜投票的匹配率
    max_difference: number; // 自己投票和总榜投票的最大差异
    max_diff_vote: myvote; // 自己投票和总榜投票的最大差异的投票
}

export async function GetMyRank(): Promise<MyRankData> {
    const res = await axiosInstance.get(`${BACKEN_URL}/api/rank/getMyRank`);
    return res.data;
}