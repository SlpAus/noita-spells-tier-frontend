import { perkApi } from "../../axiosConfig";
import { RankedPerk } from "../../types/perk/perk";
import { PerkRankingSchema } from "../../types/perk/zodPerkSchemas";
import { z, ZodError } from "zod";

export async function GetPerkRanking(): Promise<RankedPerk[]> {
    try {
        const response = await perkApi.get("/api/perks/ranking");
        // Validate the response data with Zod
        const validatedData = PerkRankingSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetPerkRanking:", z.treeifyError(error));
            throw new Error("从服务器收到的排行榜数据格式不正确。");
        }
        // Re-throw other errors
        throw error;
    }
}
