import { spellApi } from "../../axiosConfig";
import { imageSpell } from "../../types/spell/spell";
import { ImageSpellSchema } from "../../types/spell/zodSpellSchemas";
import { z, ZodError } from "zod";

export async function GetSpellImage(id: string): Promise<imageSpell> {
    try {
        const response = await spellApi.get(`/api/spells/${id}`);
        const validatedData = ImageSpellSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Zod validation error in GetSpellPair:", z.treeifyError(error));
        }
        // Re-throw other errors
        throw error;
    }
}
