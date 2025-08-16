// 对应后端的 API 响应模型

/**
 * @description GET /api/spells/ranking 返回的法术结构
 */
export interface RankedSpell {
    id:        string;
    name:      string;
    imageUrl:  string;
    type:      number;
    score:     number;
    total:     number;
    win:       number;
    rankScore: number;
}

/**
 * @description GET /api/spells/:id 返回的法术结构
 */
export interface imageSpell {
    id:        string;
    imageUrl:  string;
    type:      number;
}

/**
 * @description GET /api/spells/pair 返回的法术结构
 */
export interface PairedSpell {
    id:          string;
    name:        string;
    description: string;
    imageUrl:    string;
    type:        number;
    rank:        number;
}