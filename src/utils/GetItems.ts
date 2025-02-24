// 调用后端的restfulAPI,获得两个道具数据
import axios from "axios";
import { item } from "../types/item";
// get /api/getItem?num=XXX

export async function GetItems(num : number): Promise<item[]> {
    const res = await axios.get(`/api/getItem?num=${num}`);
    return res.data;
}

