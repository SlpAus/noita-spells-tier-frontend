import { z } from 'zod';
import { VOTEResult } from './votingResult';

// Enum for VOTEResult
export const VOTEResultSchema = z.nativeEnum(VOTEResult);
// Schema for RankedSpell (GET /api/spells/ranking)
export const RankedSpellSchema = z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string(),
    type: z.number(),
    score: z.number(),
    total: z.number(),
    win: z.number(),
    rankScore: z.number(),
});
export const RankingSchema = z.array(RankedSpellSchema);

// Schema for imageSpell (GET /api/spells/:id)
export const ImageSpellSchema = z.object({
    id: z.string(),
    imageUrl: z.string(),
    type: z.number(),
});

// Schema for PairedSpell (used in GET /api/spells/pair)
export const PairedSpellSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    type: z.number(),
    rank: z.number(),
});

// Schema for GetPairAPIResponse (GET /api/spells/pair)
export const GetPairAPIResponseSchema = z.object({
    spellA: PairedSpellSchema,
    spellB: PairedSpellSchema,
    pairId: z.string(),
    signature: z.string(),
});

// Schema for SubmitVotePayload (POST /api/vote request)
export const SubmitVotePayloadSchema = z.object({
    spellA: z.string(),
    spellB: z.string(),
    result: VOTEResultSchema,
    pairId: z.string(),
    signature: z.string(),
});

// --- Schemas for UserReport sub-types ---

export const SpellNameRankSchema = z.object({
    id: z.string(),
    name: z.string(),
    rank: z.number().optional(),
});

// A stricter version of SpellNameRankSchema where 'rank' is required.
export const SpellNameRankWithRequiredRankSchema = SpellNameRankSchema.extend({
    rank: z.number(),
});

export const HighlightVoteSchema = z.object({
    voteNumber: z.number(),
    spellA: SpellNameRankWithRequiredRankSchema,
    spellB: SpellNameRankWithRequiredRankSchema,
    result: VOTEResultSchema,
});

export const MilestoneVoteSchema = z.object({
    voteNumber: z.number(),
    spellA: SpellNameRankSchema,
    spellB: SpellNameRankSchema,
    result: VOTEResultSchema,
    date: z.iso.datetime({ offset: true })
});

export const EncounterRecordSchema = z.object({
    voteNumber: z.number(),
    spellA: SpellNameRankWithRequiredRankSchema,
    spellB: SpellNameRankWithRequiredRankSchema,
    specialA: z.boolean(),
    specialB: z.boolean(),
    result: VOTEResultSchema,
    date: z.iso.datetime({ offset: true }),
});

export const ChoiceCountsSchema = z.object({
    wins: z.number(),
    draw: z.number(),
    skip: z.number(),
});

export const MostChosenSpellSchema = z.object({
    id: z.string(),
    name: z.string(),
    voteCount: z.number(),
});

export const HighestWinRateSpellSchema = z.object({
    id: z.string(),
    name: z.string(),
    winRate: z.number(),
});

export const ContrarianSpellSchema = z.object({
    id: z.string(),
    name: z.string(),
    winRate: z.number(),
    communityScoreRate: z.number(),
});

export const ActivityRecordSchema = z.object({
    fromDate: z.iso.datetime({ offset: true }),
    toDate: z.iso.datetime({ offset: true }),
    voteCount: z.number(),
});

// Schema for the main UserReport
export const UserReportSchema = z.object({
    userId: z.string(),
    generatedAt: z.iso.datetime({ offset: true }),
    totalVotes: z.number(),
    voteRankpercent: z.number(),
    choices: ChoiceCountsSchema,
    decisionRate: z.number().optional(),
    communityDecisionRate: z.number().optional(),
    communityConsistencyIndex: z.number().optional(),
    upsetTendency: z.number().optional(),
    mostChosen: MostChosenSpellSchema.optional(),
    highestWinRate: HighestWinRateSpellSchema.optional(),
    chosenOne: ContrarianSpellSchema.optional(),
    nemesis: ContrarianSpellSchema.optional(),
    mostSubversive: HighlightVoteSchema.optional(),
    firstVote: MilestoneVoteSchema.optional(),
    milestones: z.array(MilestoneVoteSchema).optional(),
    busiestDay: ActivityRecordSchema.optional(),
    firstEncounterTop: EncounterRecordSchema.optional(),
    firstEncounterBottom: EncounterRecordSchema.optional(),
});