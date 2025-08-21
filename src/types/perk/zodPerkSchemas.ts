import { z } from 'zod';
import { VOTEResultSchema } from '../zodSchemas'; // Assuming this will be in a shared location

// Schema for RankedPerk (GET /api/perks/ranking)
export const RankedPerkSchema = z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string(),
    score: z.number(),
    total: z.number(),
    win: z.number(),
    rankScore: z.number(),
});
export const PerkRankingSchema = z.array(RankedPerkSchema);

// Schema for imagePerk (GET /api/perks/:id)
export const ImagePerkSchema = z.object({
    id: z.string(),
    imageUrl: z.string(),
});

// Schema for PairedPerk (used in GET /api/perks/pair)
export const PairedPerkSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    rank: z.number(),
});

// Schema for GetPerkPairAPIResponse (GET /api/perks/pair)
export const GetPerkPairAPIResponseSchema = z.object({
    perkA: PairedPerkSchema,
    perkB: PairedPerkSchema,
    pairId: z.string(),
    signature: z.string(),
});

// Schema for SubmitPerkVotePayload (POST /api/perks/vote request)
export const SubmitPerkVotePayloadSchema = z.object({
    perkA: z.string(),
    perkB: z.string(),
    result: VOTEResultSchema,
    pairId: z.string(),
    signature: z.string(),
});

// --- Schemas for UserReport sub-types ---

export const PerkNameRankSchema = z.object({
    id: z.string(),
    name: z.string(),
    rank: z.number().optional(),
});

// A stricter version of PerkNameRankSchema where 'rank' is required.
export const PerkNameRankWithRequiredRankSchema = PerkNameRankSchema.extend({
    rank: z.number(),
});

export const HighlightVoteSchema = z.object({
    voteNumber: z.number(),
    perkA: PerkNameRankWithRequiredRankSchema,
    perkB: PerkNameRankWithRequiredRankSchema,
    result: VOTEResultSchema,
});

export const MilestoneVoteSchema = z.object({
    voteNumber: z.number(),
    perkA: PerkNameRankSchema,
    perkB: PerkNameRankSchema,
    result: VOTEResultSchema,
    date: z.iso.datetime({ offset: true })
});

export const EncounterRecordSchema = z.object({
    voteNumber: z.number(),
    perkA: PerkNameRankWithRequiredRankSchema,
    perkB: PerkNameRankWithRequiredRankSchema,
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

export const MostChosenPerkSchema = z.object({
    id: z.string(),
    name: z.string(),
    voteCount: z.number(),
});

export const HighestWinRatePerkSchema = z.object({
    id: z.string(),
    name: z.string(),
    winRate: z.number(),
});

export const ContrarianPerkSchema = z.object({
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
    mostChosen: MostChosenPerkSchema.optional(),
    highestWinRate: HighestWinRatePerkSchema.optional(),
    chosenOne: ContrarianPerkSchema.optional(),
    nemesis: ContrarianPerkSchema.optional(),
    mostSubversive: HighlightVoteSchema.optional(),
    firstVote: MilestoneVoteSchema.optional(),
    milestones: z.array(MilestoneVoteSchema).optional(),
    busiestDay: ActivityRecordSchema.optional(),
    firstEncounterTop: EncounterRecordSchema.optional(),
    firstEncounterBottom: EncounterRecordSchema.optional(),
});