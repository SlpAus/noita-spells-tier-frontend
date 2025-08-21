import { VOTEResult } from "../votingResult";

// --- Root Report Type ---

export interface UserReport {
    userId: string;
    generatedAt: string; // ISO 8601 date string
    totalVotes: number;
    voteRankpercent: number;
    choices: ChoiceCounts;
    decisionRate?: number;
    communityDecisionRate?: number;
    communityConsistencyIndex?: number;
    upsetTendency?: number;
    mostChosen?: MostChosenSpell;
    highestWinRate?: HighestWinRateSpell;
    chosenOne?: ContrarianSpell;
    nemesis?: ContrarianSpell;
    mostSubversive?: HighlightVote;
    firstVote?: MilestoneVote;
    milestones?: MilestoneVote[];
    busiestDay?: ActivityRecord;
    firstEncounterTop?: EncounterRecord;
    firstEncounterBottom?: EncounterRecord;
}

// --- Sub-types for Report ---

export interface ChoiceCounts {
    wins: number;
    draw: number;
    skip: number;
}

export interface MostChosenSpell {
    id: string;
    name: string;
    voteCount: number;
}

export interface HighestWinRateSpell {
    id: string;
    name: string;
    winRate: number;
}

export interface ContrarianSpell {
    id: string;
    name: string;
    winRate: number;
    communityScoreRate: number;
}

export interface SpellNameRank {
    id: string;
    name: string;
    rank?: number;
}

export interface HighlightVote {
    voteNumber: number;
    spellA: SpellNameRank;
    spellB: SpellNameRank;
    result: VOTEResult;
}

export interface MilestoneVote {
    voteNumber: number;
    spellA: SpellNameRank;
    spellB: SpellNameRank;
    result: VOTEResult;
    date: string; // ISO 8601 date string
}

export interface ActivityRecord {
    fromDate: string; // ISO 8601 date string
    toDate: string; // ISO 8601 date string
    voteCount: number;
}

export interface EncounterRecord {
    voteNumber: number;
    spellA: SpellNameRank;
    spellB: SpellNameRank;
    specialA: boolean;
    specialB: boolean;
    result: VOTEResult;
    date: string; // ISO 8601 date string
}