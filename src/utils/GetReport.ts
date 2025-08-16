import axiosInstance from "../axiosConfig";
import { UserReport } from "../types/report";
import { BACKEN_URL } from "../config";
import { UserReportSchema } from "../types/zodSchemas";
import { z, ZodError } from "zod";

export async function GetReport(): Promise<UserReport> {
    try {
        const response = await axiosInstance.get(`${BACKEN_URL}/api/report`);
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