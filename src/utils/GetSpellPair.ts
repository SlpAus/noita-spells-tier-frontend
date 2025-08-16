// 调用后端的restfulAPI,获得两个法术数据
import axiosInstance from "../axiosConfig";
import { GetPairAPIResponse } from "../types/pair";
import { BACKEN_URL } from "../config";
import { GetPairAPIResponseSchema } from "../types/zodSchemas";
import { z, ZodError } from "zod";

interface ExcludeParams {
    excludeA: string;
    excludeB: string;
}

export async function GetSpellPair(params?: ExcludeParams): Promise<GetPairAPIResponse> {
    try {
        let url = `${BACKEN_URL}/api/spells/pair`;
        if (params) {
            const queryParams = new URLSearchParams({
                excludeA: params.excludeA,
                excludeB: params.excludeB,
            }).toString();
            url = `${url}?${queryParams}`;
        }
        const res = await axiosInstance.get(url);
        const validatedData = GetPairAPIResponseSchema.parse(res.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetSpellPair:", z.treeifyError(error));
            throw new Error("从服务器收到的法术对数据格式不正确。");
        }
        // Re-throw other errors
        throw error;
    }
}