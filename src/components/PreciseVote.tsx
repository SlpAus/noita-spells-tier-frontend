import React, { useEffect, useState } from "react";
import { item } from "../types/item";
import { Pvote, GetPvoteNum, SendPvote as pvoteFunc, GetPvoteRecords } from "../utils/PVote";
import { BACKEN_URL } from "../config";
import Box from "./UI/Box";




export default function PreciseVote(props: { allItems: item[] }) {
    const allItems = props.allItems;
    const [ipVoteCount, setIpVoteCount] = useState(0);

    const [winnerSearch, setWinnerSearch] = useState("");
    const [loserSearch, setLoserSearch] = useState("");
    const [winnerSelected, setWinnerSelected] = useState<item | null>(null);
    const [loserSelected, setLoserSelected] = useState<item | null>(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [PvoteRecords, setPvoteRecords] = useState<Pvote[]>([]);
    const [enablePvoteRecords, setEnablePvoteRecords] = useState(false);

    const maxVoteCount = 100;

    // Filter items by search term
    const filteredWinnerItems = allItems.filter((it) =>
        it.name.toLowerCase().includes(winnerSearch.toLowerCase())
    );
    const filteredLoserItems = allItems.filter((it) =>
        it.name.toLowerCase().includes(loserSearch.toLowerCase())
    );

    // Load the full item list and current IP vote count on component mount
    useEffect(() => {
        GetPvoteNum()
            .then((num) => {
                setIpVoteCount(num.pvoteNum);
            })
            .catch((error) => {
                console.error("Error fetching precise vote number:", error);
            });
    }, []);

    const handleSubmitVote = async () => {
        if (!winnerSelected || !loserSelected) {
            setMessage("请选择胜者和败者的道具！");
            return;
        }
        if (winnerSelected.id === loserSelected.id) {
            setMessage("胜者和败者不能为同一个道具");
            return;
        }
        if (!description) {
            setMessage("请输入您的投票理由！");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            const result = await pvoteFunc({
                winner: winnerSelected.id,
                loser: loserSelected.id,
                description,
            });
            setMessage("申诉成功，谢谢你的支持！");
            // Increment the IP vote count
            setIpVoteCount((prev) => prev + 1);
            // Clear selections and description
            setWinnerSelected(null);
            setLoserSelected(null);
            setWinnerSearch("");
            setLoserSearch("");
            setDescription("");
        } catch (error: any) {
            console.error("Error performing precise vote:", error);
            if (error.response) {
                const errorMessage = error.response.data.error
                setMessage(errorMessage);
            } else
                setMessage("投票失败，请刷新或稍后再试！");
        } finally {
            setLoading(false);
        }
    };

    const handleGetPvoteRecords = async () => {
        if (!enablePvoteRecords) {
            setEnablePvoteRecords(true);
            const records = await GetPvoteRecords();
            console.log(records)
            setPvoteRecords(records.pvoteRecords);
        } else {
            setEnablePvoteRecords(false);
            setPvoteRecords([]);
        }
    }

    return (
        <Box className="space-y-4">
            <h2 className="text-3xl font-bold mb-4 text-red-600">为什么为什么为什么为什么这个不如那个</h2>
            {ipVoteCount >= maxVoteCount ? (
                <p className="text-red-500 font-bold">
                    您已经达到定向投票次数（每个IP每小时最多3次）。
                </p>
            ) : (
                <>
                    <div className="mb-4 space-y-3">
                        <label className="block text-lg font-bold mb-1">
                            我寻思
                        </label>
                        {winnerSelected && (
                            <button onClick={() => setWinnerSelected(null)}
                                className="">
                                <img src={BACKEN_URL
                                    + winnerSelected.url} alt={winnerSelected.name} className="w-8 h-8 inline-block" />
                                {winnerSelected.name}
                            </button>
                        )}
                        {!winnerSelected && (
                            <input
                                type="text"
                                value={winnerSearch}
                                onChange={(e) => {
                                    setWinnerSearch(e.target.value);
                                    setWinnerSelected(null);
                                }}
                                placeholder="请输入道具名称..."
                                className={"border p-2 rounded-xl  items-center text-center"}
                            />

                        )}
                        {winnerSearch && !winnerSelected && (
                            <ul className=" border rounded-xl max-h-60 overflow-y-auto">
                                {filteredWinnerItems.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => {
                                            setWinnerSelected(item);
                                            setWinnerSearch(item.name);
                                        }}
                                        className="cursor-pointer p-2 hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        <img src={BACKEN_URL + item.url} alt={item.name} className="w-8 h-8 inline-block" />
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mb-4 space-y-3">
                        <label className="block text-lg font-bold mb-1">
                            应该大于
                        </label>
                        {loserSelected && (
                            <button onClick={() => setLoserSelected(null)}
                                className="">
                                <img src={BACKEN_URL
                                    + loserSelected.url} alt={loserSelected.name} className="w-8 h-8 inline-block" />
                                {loserSelected.name}
                            </button>
                        )}
                        {!loserSelected && (
                            <input
                                type="text"
                                value={loserSearch}
                                onChange={(e) => {
                                    setLoserSearch(e.target.value);
                                    setLoserSelected(null);
                                }}
                                placeholder="请输入道具名称..."
                                className={"border p-2 rounded-xl  items-center text-center"}
                            />
                        )}
                        {loserSearch && !loserSelected && (
                            <ul className=" border rounded-xl max-h-60 overflow-y-auto">
                                {filteredLoserItems.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => {
                                            setLoserSelected(item);
                                            setLoserSearch(item.name);
                                        }}
                                        className="cursor-pointer p-2 hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        <img src={BACKEN_URL + item.url} alt={item.name} className="w-8 h-8 inline-block" />
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">
                            因为
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="请输入您的投票理由..."
                            className="border p-2 rounded w-full text-center"
                        ></textarea>
                    </div>

                    <button
                        onClick={handleSubmitVote}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300"
                    >
                        {loading ? "投票中..." : "提交申诉"}
                    </button>
                    {message && <p className="mt-4 text-lg text-red-500">{message}</p>}
                    <p className="mt-2 text-gray-600">
                        您当前已申诉: {ipVoteCount} 次 (每个IP最多3次)
                    </p>
                </>
            )}
            <div>
                <button onClick={handleGetPvoteRecords} className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300">
                    {enablePvoteRecords ? "隐藏申诉记录" : "查看申诉记录"}
                </button>
                <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                    {PvoteRecords.map((record, index) => {
                        const winner = allItems.find((item) => item.id === record.winner);
                        const loser = allItems.find((item) => item.id === record.loser);
                        return (
                            <li key={index} className="border p-2 rounded-xl flex items-center justify-center">
                                我寻思<img src={BACKEN_URL + winner?.url}></img>应该大于<img src={BACKEN_URL + loser?.url}></img>，因为：{record.description}
                            </li>
                        )

                    }
                    )}
                </ul>
            </div>
        </Box>
    );
}