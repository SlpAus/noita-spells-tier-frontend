// export interface votingResult {
//     type: string; // 投票的类型 (道具/人物)
//     winner: number; // 胜利者的id
//     loser: number; // 失败者的id
//     filterNum: number; // 过滤后道具的数量
// }

// resulte枚举

export enum VOTEResult {
    LEFT = 1,
    RIGHT = 2,
    NOBODY = 3,
    SKIP = 4
}
export interface vote {
    result: VOTEResult // 投票的类型 1为左边 2为右边 3为全输 4为跳过
}