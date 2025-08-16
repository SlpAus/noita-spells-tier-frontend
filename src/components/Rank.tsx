import { RankedSpell } from "../types/spell";
import Box from "./UI/Box";
import { useState } from "react";
import SpellIcon from "./UI/SpellIcon";

type SortCriteria = "rankScore" | "score" | "winRate" | "total";
type Tier = "S" | "A" | "B" | "C" | "D";

const getTier = (index: number, total: number): Tier => {
    const sTierCount = Math.floor(total * 0.025);
    const aTierCount = Math.floor(total * 0.20);
    const dTierCount = sTierCount;
    const cTierCount = aTierCount;

    if (index < sTierCount) return "S";
    if (index < aTierCount) return "A";
    if (index >= total - dTierCount) return "D";
    if (index >= total - cTierCount) return "C";
    return "B";
};

const getTierColor = (tier: Tier): string => {
    switch (tier) {
        case "S": return "bg-red-900";
        case "A": return "bg-amber-800";
        case "B": return "bg-yellow-700";
        case "C": return "bg-green-800";
        case "D": return "bg-indigo-900";
        default: return "bg-gray-600";
    }
};

export default function Rank({ rank, title, onRefresh }: { rank: RankedSpell[], title: string, onRefresh: () => void }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default to asc for rank
    const [sortBy, setSortBy] = useState<SortCriteria>("rankScore");

    // Add originalIndex and tier to each spell
    const rankedSpellsWithMeta = rank.map((spell, index) => ({
        ...spell,
        originalIndex: index + 1,
        tier: getTier(index, rank.length),
    }));

    const toggleSortOrder = (criteria: SortCriteria) => {
        if (sortBy === criteria) {
            setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(criteria);
            setSortOrder("desc"); // Default to desc for new criteria
        }
    };

    const sortedRank = [...rankedSpellsWithMeta].sort((a, b) => {
        const order = sortOrder === "asc" ? 1 : -1;
        switch (sortBy) {
            case "score": return (a.score - b.score) * order;
            case "winRate":
                const winRateA = a.total > 0 ? a.win / a.total : 0;
                const winRateB = b.total > 0 ? b.win / b.total : 0;
                return (winRateA - winRateB) * order;
            case "total": return (a.total - b.total) * order;
            case "rankScore":
            default: return (a.originalIndex - b.originalIndex) * order; // Sort by original rank for rankScore
        }
    });

    const NotExpandSize = 10;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const SortButton = ({ criteria, label, className }: { criteria: SortCriteria, label: string, className?: string }) => (
        <button type="button" onClick={() => toggleSortOrder(criteria)} className={`font-bold text-center ${className}`}>
            {label} {sortBy === criteria && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
    );

    return (
        <Box>
            <div className="relative flex justify-center items-center px-10 py-5">
                <h3 className="text-4xl font-bold">{title}</h3>
                <button type="button" onClick={handleRefresh} className="absolute right-10 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300" disabled={isRefreshing}>
                    {isRefreshing ? "刷新中..." : "刷新"}
                </button>
            </div>
            <div className="grid grid-cols-12 gap-x-4 px-5 py-3 bg-gray-700 text-lg items-center">
                <p className="font-bold text-center col-span-1">等级</p>
                <p className="font-bold text-center col-span-1">排名</p>
                <p className="font-bold text-center col-span-4">法术</p>
                <SortButton criteria="rankScore" label="社区认同度" className="col-span-2" />
                <SortButton criteria="score" label="ELO分" className="col-span-2" />
                <div className="flex flex-col items-center col-span-2">
                    <SortButton criteria="winRate" label="胜率" />
                    <SortButton criteria="total" label="总场次" className="text-sm" />
                </div>
            </div>
            <div className="flex flex-col">
                {sortedRank.slice(0, isExpanded ? sortedRank.length : NotExpandSize).map((item) => {
                    const winRate = item.total > 0 ? (item.win / item.total) * 100 : 0;
                    return (
                        <div key={item.id} className={`grid grid-cols-12 gap-x-4 items-center px-5 py-2 border-b border-gray-200 ${getTierColor(item.tier)}`}>
                            <p className="font-bold text-center text-xl col-span-1">{item.tier}</p>
                            <p className="text-center col-span-1">{item.originalIndex}</p>
                            <div className="col-span-4 flex items-center min-w-0">
                                <SpellIcon imageUrl={item.imageUrl} type={item.type} />
                                <div className="ml-3 text-left break-words">
                                    <p className="text-base font-semibold">{item.name}</p>
                                    <p className="text-xs text-gray-400">{item.id}</p>
                                </div>
                            </div>
                            <p className="text-center col-span-2">{(item.rankScore * 100).toFixed(2)}%</p>
                            <p className="text-center col-span-2">{item.score.toFixed(1)}</p>
                            <div className="text-center col-span-2">
                                <p>{winRate.toFixed(1)}%</p>
                                <p className="text-xs text-gray-400">({item.total})</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button type="button" onClick={toggleExpand} className="w-full flex justify-center items-center px-10 py-2 border-t-2 border-gray-600 hover:bg-gray-700 transition-colors duration-300">
                <p className="text-xl font-bold">
                    {isExpanded ? "▲ 收起" : `▼ 展开 (显示 ${Math.min(NotExpandSize, sortedRank.length)}/${sortedRank.length} 条)`}
                </p>
            </button>
        </Box>
    );
}