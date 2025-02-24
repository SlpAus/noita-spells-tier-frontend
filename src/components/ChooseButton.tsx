// 选择按钮，用于做出选择
import React from "react";
import Button from "./UI/Button";
import { button } from "../types/button";

export interface ChooseButtonProps {
    OnClick_1 : () => void,
    OnClick_2 : () => void,
    OnClick_3 : () => void,
}

const ChooseButton = ( props:{prop : ChooseButtonProps} ) => {
    const bt_1 : button = {
        text : "我寻思左边能行",
        onClick : props.prop.OnClick_1,        
    }
    const bt_2 : button = {
        text : "显然是右边厉害",
        onClick : props.prop.OnClick_2,        
    }
    const bt_3 : button = {
        text : "全都是大便",
        onClick : props.prop.OnClick_3,
    }

    return (
        <div className="flex flex-col max-w-max items-center space-y-5">
            <Button bt={bt_1} />
            <Button bt={bt_2} />
            <Button bt={bt_3} />
        </div>
    );

}

export default ChooseButton;
