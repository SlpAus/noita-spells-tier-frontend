import { perkApi } from "../../axiosConfig";
import { UserReport } from "../../types/perk/report";
import { UserReportSchema } from "../../types/perk/zodPerkSchemas";
import { z, ZodError } from "zod";

export async function GetPerkReport(): Promise<UserReport> {
    try {
        const response = await perkApi.get("/api/perks/report");
        const validatedData = UserReportSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetPerkReport:", z.treeifyError(error));
            throw new Error("从服务器收到的报告数据格式不正确。");
        }
        // Re-throw other errors
        throw error;
    }
}
