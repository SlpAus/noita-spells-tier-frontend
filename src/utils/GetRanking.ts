import axios from "axios";
import { ranking } from "../types/ranking";
import { BACKEN_URL } from "../config";
import { filter } from "../types/filter";

// get /api/rank/getRanking?type=XXX

export async function GetRanking(type: string, filter: filter): Promise<ranking[]> {
    const res = await axios.get(`${BACKEN_URL}/api/rank/getRanking`, {
        params: {
            type: type,
            startQuality: filter.startQuality,
            endQuality: filter.endQuality,
            canBeLost: filter.canBeLost
        }
    });
    return res.data;
}

