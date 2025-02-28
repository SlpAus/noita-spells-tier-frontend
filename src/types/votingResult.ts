export interface votingResult {
    type: string; // 投票的类型 (道具/人物)
    winner: number; // 胜利者的id
    loser: number; // 失败者的id
    filterNum: number; // 过滤后道具的数量
}