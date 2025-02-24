// 图片的类型

export interface image{
    url : string; // 图片的url
    name? : string; // 图片的名字(可选)
    alt? : string; // 图片的描述(可选)
    item_id? : number; // 如果为道具图片，道具的id(可选)
    width? : number; // 图片的宽度(可选)
    height? : number; // 图片的高度(可选)
}