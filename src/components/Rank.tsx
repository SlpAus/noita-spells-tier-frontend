//// filepath: /home/qiuy/projects/ys_ranking/ys-voting-frontend/src/components/Rank.tsx
import { ranking } from "../types/ranking";
import Box from "./UI/Box";
import { useState } from "react";

export default function Rank(props: { rank: ranking[], title: string, onRefresh: () => void }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [sortBy, setSortBy] = useState<"total" | "score" | "winpercent">("score");
    const PAGE_SIZE = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const [jumpPage, setJumpPage] = useState(""); // 输入跳转页码

    const toggleSortOrder = (criteria: "score" | "winpercent" | "total") => {
        if (sortBy === criteria) {
            setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(criteria);
            setSortOrder("desc");
        }
    };

    const sortedRank = [...props.rank].sort((a, b) => {
        if (sortBy === "score") {
            return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
        } else if (sortBy === "winpercent") {
            return sortOrder === "asc" ? a.winpercent - b.winpercent : b.winpercent - a.winpercent;
        } else {
            return sortOrder === "asc" ? a.totals - b.totals : b.totals - a.totals;
        }
    });

    const totalPages = Math.ceil(sortedRank.length / PAGE_SIZE);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await props.onRefresh();
        setIsRefreshing(false);
    };

    const getBackgroundColor = (index: number) => {
        const colors = [
            "bg-red-400", "bg-red-300", "bg-red-200",
            "bg-yellow-400", "bg-yellow-300", "bg-yellow-200",
            "bg-green-400", "bg-green-300", "bg-green-200"
        ];
        const sectionSize = Math.floor(props.rank.length / 9);
        const idx = (Math.floor(index / sectionSize) > 8) ? 8 : Math.floor(index / sectionSize);
        return colors[idx];
    };

    const getCupLevel = (index: number) => {
        const levels = [
            "超大杯上", "超大杯中", "超大杯下",
            "大杯上", "大杯中", "大杯下",
            "中杯上", "中杯中", "中杯下"
        ];
        const sectionSize = Math.floor(props.rank.length / 9);
        const idx = (Math.floor(index / sectionSize) > 8) ? 8 : Math.floor(index / sectionSize);
        return levels[idx];
    };

    return (
        <Box>
            <div className="flex justify-between items-center px-10 py-5">
                <div className="flex-1 text-center">
                    <h2 className="text-4xl font-bold">{props.title}</h2>
                </div>
                <button
                    onClick={handleRefresh}
                    className="ml-4 px-2 py-1 text-white bg-blue-400 rounded hover:bg-blue-600 transition-colors duration-300"
                    disabled={isRefreshing}
                >
                    {isRefreshing ? "刷新中..." : "刷新"}
                </button>
            </div>
            <div className="flex justify-between px-5 pt-5 rounded-xl">
                <p className="text-2xl font-bold text-center w-1/6">杯级</p>
                <p className="text-2xl font-bold text-center w-1/6">排名</p>
                <p className="text-2xl font-bold text-center w-1/6">名字</p>
                <button
                    onClick={() => toggleSortOrder("score")}
                    className="text-2xl font-bold text-center w-1/6"
                >
                    分数 {sortBy === "score" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                    onClick={() => toggleSortOrder("winpercent")}
                    className="text-2xl font-bold text-center w-1/6"
                >
                    胜率 {sortBy === "winpercent" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                    onClick={() => toggleSortOrder("total")}
                    className="text-2xl font-bold text-center w-1/6"
                >
                    总场 {sortBy === "total" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
            </div>
            <div className="flex flex-col rounded-xl">
                {sortedRank.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((item, index) => (
                    <div key={(currentPage - 1) * PAGE_SIZE + index} className={`flex justify-between px-5 py-0.5 ${getBackgroundColor((currentPage - 1) * PAGE_SIZE + index)}`}>
                        <p className="text-lg text-center font-semibold w-1/6">{getCupLevel((currentPage - 1) * PAGE_SIZE + index)}</p>
                        <p className="text-lg text-center w-1/6">{item.rank}</p>
                        <p className="text-lg text-center w-1/6">{item.name}</p>
                        <p className="text-lg text-center w-1/6">{item.score.toFixed(1)}</p>
                        <p className="text-lg text-center w-1/6">{(item.winpercent * 100).toFixed(1)}%</p>
                        <p className="text-lg text-center w-1/6">{(item.totals).toFixed(1)}</p>
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col items-center space-y-2 px-10 py-2 border-t-2 border-gray-200">
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300 hover:text-white"
                    >
                        首页
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300 hover:text-white"
                    >
                        上一页
                    </button>
                    <span className="text-xl font-bold">
                        第 {currentPage} 页 / 共 {totalPages} 页
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300 hover:text-white"
                    >
                        下一页
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-700 transition-colors duration-300 hover:text-white"
                    >
                        尾页
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        value={jumpPage}
                        onChange={(e) => setJumpPage(e.target.value)}
                        placeholder="请输入页码"
                        className="p-1 border rounded text-center"
                    />
                    <button
                        onClick={() => {
                            const targetPage = Number(jumpPage);
                            if (targetPage >= 1 && targetPage <= totalPages) {
                                setCurrentPage(targetPage);
                            }
                        }}
                        className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                    >
                        确定
                    </button>
                </div>
            </div>
        </Box>
    );
}