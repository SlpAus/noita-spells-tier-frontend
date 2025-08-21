// 调用后端的restfulAPI,获得两个天赋数据
import { perkApi } from "../../axiosConfig";
import { GetPerkPairAPIResponse } from "../../types/perk/pair";
import { GetPerkPairAPIResponseSchema } from "../../types/perk/zodPerkSchemas";
import { z, ZodError } from "zod";

interface ExcludeParams {
    excludeA: string;
    excludeB: string;
}

export async function GetPerkPair(params?: ExcludeParams): Promise<GetPerkPairAPIResponse> {
    try {
        const response = await perkApi.get("/api/perks/pair", { params });
        const validatedData = GetPerkPairAPIResponseSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetPerkPair:", z.treeifyError(error));
            throw new Error("从服务器收到的天赋对数据格式不正确。");
        }
        // Re-throw other errors
        throw error;
    }
}
