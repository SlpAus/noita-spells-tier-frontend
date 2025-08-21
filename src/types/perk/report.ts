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
    mostChosen?: MostChosenPerk;
    highestWinRate?: HighestWinRatePerk;
    chosenOne?: ContrarianPerk;
    nemesis?: ContrarianPerk;
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

export interface MostChosenPerk {
    id: string;
    name: string;
    voteCount: number;
}

export interface HighestWinRatePerk {
    id: string;
    name: string;
    winRate: number;
}

export interface ContrarianPerk {
    id: string;
    name: string;
    winRate: number;
    communityScoreRate: number;
}

export interface PerkNameRank {
    id: string;
    name: string;
    rank?: number;
}

export interface HighlightVote {
    voteNumber: number;
    perkA: PerkNameRank;
    perkB: PerkNameRank;
    result: VOTEResult;
}

export interface MilestoneVote {
    voteNumber: number;
    perkA: PerkNameRank;
    perkB: PerkNameRank;
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
    perkA: PerkNameRank;
    perkB: PerkNameRank;
    specialA: boolean;
    specialB: boolean;
    result: VOTEResult;
    date: string; // ISO 8601 date string
}