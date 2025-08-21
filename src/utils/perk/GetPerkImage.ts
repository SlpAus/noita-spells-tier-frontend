import { perkApi } from "../../axiosConfig";
import { imagePerk } from "../../types/perk/perk";
import { ImagePerkSchema } from "../../types/perk/zodPerkSchemas";
import { z, ZodError } from "zod";

export async function GetPerkImage(id: string): Promise<imagePerk> {
    try {
        const response = await perkApi.get(`/api/perks/${id}`);
        const validatedData = ImagePerkSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetPerkImage:", z.treeifyError(error));
        }
        // Re-throw other errors
        throw error;
    }
}
