// 调用后端的restfulAPI,获得两个道具数据
import axios from "axios";
import { item } from "../types/item";
import { BACKEN_URL } from "../config";
// get /api/item/getItem?num=XXX

export async function GetItems(num : number): Promise<item[]> {
    const res = await axios.get(`${BACKEN_URL}/api/item/getItems?num=${num}`);
    return res.data;
}

