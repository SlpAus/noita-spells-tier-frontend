import { RankedSpell } from "../types/spell/spell";
import { RankedPerk } from "../types/perk/perk";
import Box from "./UI/Box";
import { useState } from "react";
import SpellIcon from "./UI/SpellIcon";
import PerkIcon from "./UI/PerkIcon";
import { useMode } from "../contexts/ModeContext";

type RankedItem = RankedSpell | RankedPerk;
type SortCriteria = "rankScore" | "score" | "winRate" | "total";
type Tier = "S" | "A" | "B" | "C" | "D";

const spellTypeNames: { [key: number]: string } = {
    0: "投射物",
    1: "静态投射物",
    2: "投射修正",
    3: "多重施放",
    4: "材料",
    5: "其它",
    6: "实用",
    7: "被动",
};

const getTier = (index: number, total: number, mode: 'spell' | 'perk'): Tier => {
    let sTierCount, aTierCount;

    if (mode === 'perk') {
        sTierCount = Math.floor(total * 0.05);
        aTierCount = Math.floor(total * 0.25);
    } else { // spell mode
        sTierCount = Math.floor(total * 0.025);
        aTierCount = Math.floor(total * 0.20);
    }

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

export default function Rank({ rank, onRefresh }: { rank: RankedItem[], onRefresh: () => void }) {
    const { mode } = useMode();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [sortBy, setSortBy] = useState<SortCriteria>("rankScore");
    const [typeFilter, setTypeFilter] = useState<number | null>(null);
    const [showTypeFilter, setShowTypeFilter] = useState(false);

    const rankedItemsWithMeta = rank.map((item, index) => ({
        ...item,
        originalIndex: index + 1,
        tier: getTier(index, rank.length, mode),
    }));

    const filteredItems = rankedItemsWithMeta.filter(item => 
        mode === 'perk' || typeFilter === null || ('type' in item && item.type === typeFilter)
    );

    // Sub-rank should be calculated based on the default-sorted filtered list.
    const filteredItemsWithSubRank = filteredItems.map((item, index) => ({ ...item, subRank: index + 1 }));

    const toggleSortOrder = (criteria: SortCriteria) => {
        if (sortBy === criteria) {
            setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(criteria);
            setSortOrder("desc");
        }
    };

    const sortedList = [...filteredItemsWithSubRank].sort((a, b) => {
        const order = sortOrder === "asc" ? 1 : -1;
        let comparison = 0;
        switch (sortBy) {
            case "score": comparison = a.score - b.score; break;
            case "winRate":
                const winRateA = a.total > 0 ? a.win / a.total : 0;
                const winRateB = b.total > 0 ? b.win / b.total : 0;
                comparison = winRateA - winRateB;
                break;
            case "total": comparison = a.total - b.total; break;
            case "rankScore": comparison = a.rankScore - b.rankScore; break;
            default: return b.originalIndex - a.originalIndex;
        }
        return comparison !== 0 ? comparison * order : (b.originalIndex - a.originalIndex) * order;
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

    const title = mode === 'spell' ? "法术排行榜" : "天赋排行榜";
    const itemTerm = mode === 'spell' ? "法术" : "天赋";
    const filterText = typeFilter !== null ? `− ${spellTypeNames[typeFilter]}` : "";

    const handleFilterSelect = (type: number | null) => {
        setTypeFilter(type);
        setShowTypeFilter(false);
    }

    const ItemColumnHeader = () => {
        if (mode === 'perk') {
            return <p className="font-bold text-center col-span-4">{itemTerm}</p>;
        }
        return (
            <div className="relative col-span-4">
                <button type="button" onClick={() => setShowTypeFilter(!showTypeFilter)} className="font-bold text-center w-full">
                    ▼ {itemTerm} {filterText}
                </button>
                {showTypeFilter && (
                    <div className="absolute z-10 top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-md shadow-lg mt-1">
                        <button onClick={() => handleFilterSelect(null)} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700">全部</button>
                        {Object.entries(spellTypeNames).map(([type, name]) => (
                            <button key={type} onClick={() => handleFilterSelect(Number(type))} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700">{name}</button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Box>
            <div className="relative flex justify-center items-center">
                <button type="button" onClick={toggleExpand} className="w-full flex justify-center items-center px-10 py-5 hover:bg-gray-600 transition-colors duration-300">
                    <h3 className="text-4xl font-bold">{isExpanded ? "[−]" : "[+]"} {title}</h3>
                </button>
                <button type="button" onClick={handleRefresh} className="absolute right-10 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300" disabled={isRefreshing}>
                    {isRefreshing ? "刷新中..." : "刷新"}
                </button>
            </div>
            <div className="grid grid-cols-12 gap-x-4 px-5 py-3 bg-gray-700 text-lg items-center">
                <p className="font-bold text-center col-span-1">等级</p>
                <div className="flex flex-col items-center col-span-1">
                    <p className="font-bold text-center">排名</p>
                    {typeFilter !== null && <p className="font-bold text-sm">同类型</p>}
                </div>
                <ItemColumnHeader />
                <SortButton criteria="rankScore" label="社区认同度" className="col-span-2" />
                <SortButton criteria="score" label="ELO分" className="col-span-2" />
                <div className="flex flex-col items-center col-span-2">
                    <SortButton criteria="winRate" label="胜率" />
                    <SortButton criteria="total" label="总场次" className="text-sm" />
                </div>
            </div>
            <div className="flex flex-col">
                {sortedList.slice(0, isExpanded ? sortedList.length : NotExpandSize).map((item) => {
                    const winRate = item.total > 0 ? (item.win / item.total) * 100 : 0;
                    return (
                        <div key={item.id} className={`grid grid-cols-12 gap-x-4 items-center px-5 py-2 border-b border-gray-200 ${getTierColor(item.tier)}`}>
                            <p className="font-bold text-center text-xl col-span-1">{item.tier}</p>
                            <div className="flex flex-col items-center col-span-1">
                                <p>{item.originalIndex}</p>
                                {typeFilter !== null && <p className="text-xs text-gray-400">({item.subRank})</p>}
                            </div>
                            <div className="col-span-4 flex items-center min-w-0">
                                {mode === 'spell' && 'type' in item ? (
                                    <SpellIcon imageUrl={item.imageUrl} type={item.type} />
                                ) : (
                                    <PerkIcon imageUrl={item.imageUrl} />
                                )}
                                <div className="ml-3 text-left break-words">
                                    <p className="text-base font-semibold">{item.name}</p>
                                    <p className="text-xs text-gray-400">{item.id}</p>
                                </div>
                            </div>
                            <p className="text-center col-span-2">{(item.rankScore * 100).toFixed(2)}%</p>
                            <p className="text-center col-span-2">{item.score.toFixed(1)}</p>
                            <div className="text-center col-span-2">
                                <p>{winRate.toFixed(1)}%</p>
                                <p className="text-xs text-gray-400">({item.total.toFixed(2)})</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button type="button" onClick={toggleExpand} className="w-full flex justify-center items-center px-10 py-2 border-t-2 border-gray-600 hover:bg-gray-600 transition-colors duration-300">
                <p className="text-xl font-bold">
                    {isExpanded ? "▲ 收起" : `▼ 展开 (显示 ${Math.min(NotExpandSize, sortedList.length)}/${sortedList.length} 条)`}
                </p>
            </button>
        </Box>
    );
}