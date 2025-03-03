import { MyRankData, GetMyRank } from "../utils/GetMyRank";
import { useState } from "react";
import Box from "./UI/Box";
import { item } from "../types/item";
import { ranking } from "../types/ranking";
import { BACKEN_URL } from "../config";

export default function MyData(props: { allItems: item[], totalrank: ranking[] }) {
    const [myRankData, setMyRankData] = useState<MyRankData | null>(null);
    const [loading, setLoading] = useState(false);
    const [showReport, setShowReport] = useState(false); // 添加状态变量

    const handleGetMyRank = async () => {
        if (showReport) {
            setShowReport(false);
            return;
        }

        setLoading(true);
        try {
            const data = await GetMyRank();
            setMyRankData(data);
            setShowReport(true); // 显示报告
        } catch (error) {
            console.error("Error fetching my rank data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const MostVotedItem = props.allItems.find((item) => {
        return item.id === myRankData?.most_voted_item
    });

    const MostDiffItemWinner = props.allItems.find((item) => {
        return item.id === myRankData?.max_diff_vote.winner
    });

    const MostDiffItemWinnerRank = props.totalrank.find((item) => item.name === MostDiffItemWinner?.name)?.rank;

    const MostDiffItemLoser = props.allItems.find((item) => {
        return item.id === myRankData?.max_diff_vote.loser
    });

    const MostDiffItemLoserRank = props.totalrank.find((item) => item.name === MostDiffItemLoser?.name)?.rank;

    return (
        <Box>
            <div className="flex flex-col items-center space-y-4">
                <button
                    onClick={handleGetMyRank}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300"
                    disabled={loading}
                >
                    {loading ? "加载中..." : showReport ? "收起个性化报告" : "获取个性化报告"}
                </button>
                {showReport && myRankData && (
                    <div className="mt-4 flex flex-col items-center space-y-6 text-lg bg-blue-200 rounded-2xl p-4">
                        <div className="text-center">
                            <p>在您 <span className="font-bold">{myRankData.total_votes}</span> 次的投票记录中，您成功为</p>
                            <div className="flex items-center justify-center space-x-2">
                                <img src={BACKEN_URL + MostVotedItem?.url} alt={MostVotedItem?.name} className="w-12 h-12 rounded-full" />
                                <span className="font-bold">{MostVotedItem?.name}</span>
                            </div>
                            <p>投出了 <span className="font-bold">{myRankData.most_voted_times}</span> 次有效投票，看来他和你的相性很好呢</p>
                        </div>
                        <div className="text-center">
                            <p>哇塞！您的投票和总榜的投票匹配率达到了惊人的 <span className="font-bold">{(100 * myRankData.matching_rate).toFixed(2)}%</span> ！！！！</p>
                            <p>其中最大差异为 <span className="font-bold">{myRankData.max_difference}</span> 名，</p>
                            <p>这是多么小众惊人独到的理解啊！让我们回味一下当时的情景吧：</p>
                            <p>您在 <span className="font-bold">{formatDate(myRankData.max_diff_vote.CreatedAt)}</span> 时，以 <span className="font-bold">{(myRankData.max_diff_vote.weight * 100).toFixed(0)}%</span> 的权重投票给了</p>
                            <div className="flex items-center justify-center space-x-2">
                                <img src={BACKEN_URL + MostDiffItemWinner?.url} alt={MostDiffItemWinner?.name} className="w-12 h-12 rounded-full" />
                                <span className="font-bold">{MostDiffItemWinner?.name}</span>（{MostDiffItemWinnerRank} 名）
                            </div>
                            <p>而</p>
                            <div className="flex items-center justify-center space-x-2">
                                <img src={BACKEN_URL + MostDiffItemLoser?.url} alt={MostDiffItemLoser?.name} className="w-12 h-12 rounded-full" />
                                <span className="font-bold">{MostDiffItemLoser?.name}</span>（{MostDiffItemLoserRank} 名）
                            </div>
                            <p>却败下阵来，这是一个多么令人难以置信的选择啊！</p>
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
}