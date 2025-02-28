// 调用后端的restfulAPI,获得两个道具数据
import axios from "axios";
import { item } from "../types/item";
import { BACKEN_URL } from "../config";
import { filter } from "../types/filter";

// get /api/item/getItems&num=2&startQuality=1&endQuality=2&canBeLost=true
// &itemPools=A,B,C...
export async function GetItems(num: number, filter: filter): Promise<item[]> {
    try {
        const res = await axios.get(`${BACKEN_URL}/api/item/getItems`, {
            params: {
                num: num,
                startQuality: filter.startQuality,
                endQuality: filter.endQuality,
                canBeLost: filter.canBeLost,
                itemPools: filter.itemPools.join(',')
            }
        });
        if (res.status !== 200) {
            throw new Error(res.data.error);
        }
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // 提取后端定制的错误信息
            const backendError = error.response.data.error || "Unknown error occurred";
            throw new Error(backendError);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}