import axios from "axios";
import { ranking } from "../types/ranking";
import { BACKEN_URL } from "../config";

// get /api/getRanking?type=XXX

export async function GetRanking(type : string): Promise<ranking[]> {
    const res = await axios.get(`${BACKEN_URL}/api/getRanking?type=${type}`);
    return res.data;
}

