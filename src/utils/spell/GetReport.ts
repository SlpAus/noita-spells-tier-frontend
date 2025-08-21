import { spellApi } from "../../axiosConfig";
import { UserReport } from "../../types/spell/report";
import { UserReportSchema } from "../../types/spell/zodSpellSchemas";
import { z, ZodError } from "zod";

export async function GetReport(): Promise<UserReport> {
    try {
        const response = await spellApi.get("/api/spells/report");
        const validatedData = UserReportSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetReport:", z.treeifyError(error));
            throw new Error("从服务器收到的报告数据格式不正确。");
        }
        // Re-throw other errors
        throw error;
    }
}
