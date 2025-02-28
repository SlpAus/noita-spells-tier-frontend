import { ranking } from "../types/ranking";
import Box from "./UI/Box";
import { useState } from "react";

export default function Rank(props: { rank: ranking[], title: string, onRefresh: () => void }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const NotExpandSize = 30;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await props.onRefresh();
        setIsRefreshing(false);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
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
                    <h1 className="text-4xl font-bold">{props.title}</h1>
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
                <p className="text-2xl font-bold text-center w-1/6">分数</p>
                <p className="text-2xl font-bold text-center w-1/6">胜率</p>
                <p className="text-2xl font-bold text-center w-1/6">总场</p>
            </div>
            <div className="flex flex-col rounded-xl">
                {props.rank.map((item, index) => {
                    if (!isExpanded && index >= NotExpandSize) {
                        return null;
                    }
                    return (
                        <div key={index} className={` flex justify-between px-5 py-0.5 ${getBackgroundColor(index)}`}>
                            <p className="text-lg text-center font-semibold w-1/6">{getCupLevel(index)}</p>
                            <p className="text-lg text-center w-1/6">{item.rank}</p>
                            <p className="text-lg text-center w-1/6">{item.name}</p>
                            <p className="text-lg text-center w-1/6">{item.score.toFixed(1)}</p>
                            <p className="text-lg text-center w-1/6">{(item.winpercent * 100).toFixed(1)}%</p>
                            <p className="text-lg text-center w-1/6">{(item.totals).toFixed(1)}</p>
                        </div>
                    );
                })}
            </div>
            <button
                onClick={toggleExpand}
                className="w-full flex justify-center items-center px-10 py-1 border-t-2 border-gray-200 hover:bg-gray-100 transition-colors duration-300"
            >
                <p className="text-xl font-bold">
                    {isExpanded ? "▲ 收起" : "▼ 展开"}
                </p>
            </button>
        </Box>
    );
}