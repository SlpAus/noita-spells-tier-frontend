// 对应后端的 API 响应模型

/**
 * @description GET /api/perks/ranking 返回的天赋结构
 */
export interface RankedPerk {
    id:        string;
    name:      string;
    imageUrl:  string;
    score:     number;
    total:     number;
    win:       number;
    rankScore: number;
}

/**
 * @description GET /api/perks/:id 返回的天赋结构
 */
export interface imagePerk {
    id:        string;
    imageUrl:  string;
}

/**
 * @description GET /api/perks/pair 返回的天赋结构
 */
export interface PairedPerk {
    id:          string;
    name:        string;
    description: string;
    imageUrl:    string;
    rank:        number;
}