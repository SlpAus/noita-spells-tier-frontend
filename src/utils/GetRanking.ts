import axiosInstance from "../axiosConfig";
import { ranking } from "../types/ranking";
import { BACKEN_URL } from "../config";
import { filter, itemPools } from "../types/filter";

// get /api/rank/getRanking?type=XXX&itemPools=A,B,C...&startQuality=1&endQuality=2&canBeLost=true

export async function GetRanking(type: string, filter: filter): Promise<ranking[]> {
    const res = await axiosInstance.get(`${BACKEN_URL}/api/rank/getRanking`, {
        params: {
            type: type,
            startQuality: filter.startQuality,
            endQuality: filter.endQuality,
            canBeLost: filter.canBeLost,
            itemPools: filter.itemPools.join(',')
        }
    });
    return res.data;
}

