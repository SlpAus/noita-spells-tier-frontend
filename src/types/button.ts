// 按钮的props

export interface button{
    text : string; // 按钮上的文字
    onClick : (() => void); // 点击按钮的回调
    className? : string; // 按钮的额外类名(可选)
    backGround? : string; // 按钮的背景颜色(可选)
    disabled? : boolean; // 按钮是否不可用(可选)
}