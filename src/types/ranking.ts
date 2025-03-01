
export interface ranking {
    rank: number; // 排名
    name: string; // 名字
    score: number; // 分数
    winpercent: number; // 胜率
    totals: number; // 总数
}

export interface itemRank {
    id: number;
    name: string;
    total: number;
    wincount: number;
    winrate: number;
}