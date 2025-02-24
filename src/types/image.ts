// 图片的类型

export interface image{
    url : string; // 图片的url
    name? : string; // 图片的名字(可选)
    alt? : string; // 图片的描述(可选)
    width? : number; // 图片的宽度(可选)
    height? : number; // 图片的高度(可选)
    id ? : number; // 图片的id(可选)
}