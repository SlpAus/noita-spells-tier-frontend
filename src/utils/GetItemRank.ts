import axios from "axios";
import { BACKEN_URL } from "../config";
import { filter } from "../types/filter";
import { itemRank, ranking } from "../types/ranking";

// get /api/rank/getItemRank?itemID=XXX&itemPools=A,B,C...&startQuality=1&endQuality=2&canBeLost=true

export async function GetItemRank(itemID: number, filter: filter): Promise<itemRank[]> {
    const res = await axios.get(`${BACKEN_URL}/api/rank/getItemRank`, {
        params: {
            itemID: itemID,
            startQuality: filter.startQuality,
            endQuality: filter.endQuality,
            canBeLost: filter.canBeLost,
            itemPools: filter.itemPools.join(',')
        }
    });
    return res.data;
}

