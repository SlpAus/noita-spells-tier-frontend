import axiosInstance from "../axiosConfig";
import { RankedSpell } from "../types/spell";
import { BACKEN_URL } from "../config";
import { RankingSchema } from "../types/zodSchemas";
import { z, ZodError } from "zod";

export async function GetRanking(): Promise<RankedSpell[]> {
    try {
        const res = await axiosInstance.get(`${BACKEN_URL}/api/spells/ranking`);
        // Validate the response data with Zod
        const validatedData = RankingSchema.parse(res.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetRanking:", z.treeifyError(error));
            throw new Error("从服务器收到的排行榜数据格式不正确。");
        }
        // Re-throw other errors
        throw error;
    }
}

