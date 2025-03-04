import { itemRank } from "../types/ranking";
import { item } from "../types/item";
import { useState } from "react";
import { BACKEN_URL } from "../config";
import Box from "./UI/Box";

export default function ItemRank(props: {
    onSelectRankItemChange: (item: item | undefined) => void,
    selectRank: itemRank[],
    allItems: item[],
    selectRankItem: item | undefined
}) {
    // 搜索部分等保持不变……
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const itemsPerPage = 4;
    const filteredItems = props.allItems.filter(item => item.name.includes(searchTerm));
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleItemClick = (item: item) => {
        setSearchTerm(item.name);
        props.onSelectRankItemChange(item);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value.trim());
        setCurrentPage(1); // 搜索变更时重置页码
        if (value === "") {
            props.onSelectRankItemChange(undefined);
        } else if (filteredItems.length === 1 && filteredItems[0].name === value) {
            props.onSelectRankItemChange(filteredItems[0]);
        }
    };

    // 排序部分
    props.selectRank.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.winrate === b.winrate ? a.total - b.total : a.winrate - b.winrate;
        } else {
            return a.winrate === b.winrate ? b.total - a.total : b.winrate - a.winrate;
        }
    });

    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    };

    const handlePageChange = (direction: "prev" | "next" | "first" | "end") => {
        setCurrentPage(prev => {
            if (direction === "prev") return Math.max(prev - 1, 1);
            else if (direction === "next") return Math.min(prev + 1, totalPages);
            else if (direction === "first") return 1;
            else if (direction === "end") return totalPages;
            return prev;
        });
    };

    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 针对详情列表采用懒加载：初始只显示一部分，滚动到底自动加载更多
    const [rankingPage, setRankingPage] = useState(1);
    const rankingPageSize = 100;  // 每次加载10条
    const paginatedRankDetail = props.selectRank.slice(0, rankingPage * rankingPageSize);

    const handleDetailsScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // 当滚动到底部10px以内时加载更多
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            if (rankingPage * rankingPageSize < props.selectRank.length) {
                setRankingPage(prev => prev + 1);
            }
        }
    };

    return (
        <Box className="space-y-5">
            <p className="text-3xl font-bold">道具对位查询</p>
            <input
                type="text"
                placeholder="搜索道具..."
                value={searchTerm}
                onChange={handleInputChange}
                className="mb-4 p-2 border rounded-xl w-fit text-xl italic text-center"
            />
            {paginatedItems.length > 0 && (
                <ul className="mb-4 p-2 border rounded-xl max-h-60 overflow-y-auto">
                    {paginatedItems.map(item => (
                        <li
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className="cursor-pointer p-2 hover:bg-gray-200 transition-colors duration-300"
                        >
                            <img src={BACKEN_URL + item.url} alt={item.name} className="w-8 h-8 inline-block" />
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={() => handlePageChange("prev")}
                        className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
                        disabled={currentPage === 1}
                    >
                        上一页
                    </button>
                    <button
                        onClick={() => handlePageChange("next")}
                        className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
                        disabled={currentPage === totalPages}
                    >
                        下一页
                    </button>
                    <button
                        onClick={() => handlePageChange("first")}
                        className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
                        disabled={currentPage === 1}
                    >
                        首页
                    </button>
                    <button
                        onClick={() => handlePageChange("end")}
                        className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
                        disabled={currentPage === totalPages}
                    >
                        尾页
                    </button>
                </div>
            )}
            {props.selectRankItem && (
                <div>
                    <div className="flex justify-between items-center px-10 py-5">
                        <div className="flex-1 text-center text-3xl rounded-2xl w-auto hover:bg-gray-200 transition-colors duration-300">
                            {props.selectRankItem.name}对位榜单
                        </div>
                        <button
                            onClick={() => props.onSelectRankItemChange(undefined)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                        >
                            关闭
                        </button>
                    </div>
                    <div className="flex justify-between px-5 pt-5 rounded-xl">
                        <p className="text-2xl font-bold text-center w-1/5">排名</p>
                        <p className="text-2xl font-bold text-center w-1/5">名字</p>
                        <p className="text-2xl font-bold text-center w-1/5">胜场</p>
                        <button onClick={toggleSortOrder} className="text-2xl font-bold text-center w-1/5">
                            胜率 {sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                        <p className="text-2xl font-bold text-center w-1/5">总场</p>
                    </div>
                    {/* 修改详情列表为固定高度、overflow-y-auto，并监听滚动事件实现懒加载 */}
                    <div className="flex flex-col rounded-xl h-80 overflow-y-scroll" onScroll={handleDetailsScroll}>
                        {paginatedRankDetail.map((item, index) => {
                            const bgColor = item.winrate > 0.5 ? "bg-red-400" : "bg-green-400";
                            return (
                                <div key={index} className={`flex justify-between px-5 py-0.5 ${bgColor}`}>
                                    <p className="text-xl text-center w-1/5">{index + 1}</p>
                                    <p className="text-xl text-center w-1/5">{item.name}</p>
                                    <p className="text-xl text-center w-1/5">{item.wincount.toFixed(1)}</p>
                                    <p className="text-xl text-center w-1/5">{(item.winrate * 100).toFixed(1)}%</p>
                                    <p className="text-xl text-center w-1/5">{item.total.toFixed(1)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </Box>
    );
}