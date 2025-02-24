import axios from "axios";
import { ranking } from "../types/ranking";

// get /api/getRanking?type=XXX

export async function GetRanking(type : string): Promise<ranking[]> {
    const res = await axios.get(`/api/getRanking?type=${type}`);
    return res.data;
}

