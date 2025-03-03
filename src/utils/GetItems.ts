// 调用后端的restfulAPI,获得两个道具数据
import axiosInstance from "../axiosConfig";
import { item } from "../types/item";
import { BACKEN_URL } from "../config";
import { filter } from "../types/filter";

// get /api/item/getItems&num=2&startQuality=1&endQuality=2&canBeLost=true
// &itemPools=A,B,C...
export async function GetItems(num: number, filter: filter): Promise<item[]> {
    const res = await axiosInstance.get(`${BACKEN_URL}/api/item/getItems`, {
        params: {
            num: num,
            startQuality: filter.startQuality,
            endQuality: filter.endQuality,
            canBeLost: filter.canBeLost,
            itemPools: filter.itemPools.join(','),
            isActive: filter.isActive
        }
    });
    return res.data;
}