import axiosInstance from "../axiosConfig";
import { imageSpell } from "../types/spell";
import { BACKEN_URL } from "../config";

export async function GetSpellImage(id: string): Promise<imageSpell> {
    const response = await axiosInstance.get(`${BACKEN_URL}/api/spells/${id}`);
    return response.data;
}