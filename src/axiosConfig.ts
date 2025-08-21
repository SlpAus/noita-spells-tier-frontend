import axios from 'axios';
import { SPELL_BACKEND_URL, PERK_BACKEND_URL } from './config';

export const spellApi = axios.create({
    withCredentials: true,
    baseURL: SPELL_BACKEND_URL,
});

export const perkApi = axios.create({
    withCredentials: true,
    baseURL: PERK_BACKEND_URL,
});
