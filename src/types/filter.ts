
export interface filter {
    startQuality: number; // 开始的品质
    endQuality: number; // 结束的品质
    canBeLost: boolean; // 是否可以被Lost获取
    itemPools: string[]; // 道具池
    isActive: number; //是否是主动道具 0:不限 1:是 2:否
}

export const itemPools: string[] = [
    "treasure",
    "shop",
    "boss",
    "devil",
    "angel",
    "secret",
    "goldenChest",
    "redChest",
    "curse",
]

export const itemPoolsMap: Record<string, string> = {
    "treasure": "宝箱房",
    "shop": "商店",
    "boss": "Boss房",
    "devil": "恶魔房",
    "angel": "天使房",
    "secret": "隐藏房",
    "goldenChest": "金箱",
    "redChest": "红箱",
    "curse": "刺房",
}