// 调用后端的restfulAPI,获得两个法术数据
import { spellApi } from "../../axiosConfig";
import { GetPairAPIResponse } from "../../types/spell/pair";
import { GetPairAPIResponseSchema } from "../../types/spell/zodSpellSchemas";
import { z, ZodError } from "zod";

interface ExcludeParams {
    excludeA: string;
    excludeB: string;
}

export async function GetSpellPair(params?: ExcludeParams): Promise<GetPairAPIResponse> {
    try {
        const response = await spellApi.get("/api/spells/pair", { params });
        const validatedData = GetPairAPIResponseSchema.parse(response.data);
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
