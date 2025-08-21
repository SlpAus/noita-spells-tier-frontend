import { z } from 'zod';
import { VOTEResult } from './votingResult';

// Enum for VOTEResult
export const VOTEResultSchema = z.nativeEnum(VOTEResult);
