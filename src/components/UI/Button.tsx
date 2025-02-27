// 基本按钮样式

import { button } from '../../types/button';

const Button = (props: { bt: button }) => {
    const bt: button = props.bt;
    return (
        <button
            onClick={bt.onClick}
            className={`px-10 py-2 rounded-md text-black text-2xl hover:bg-gray-300 transition-colors duration-300 font-semibold ${bt.backGround ? bt.backGround : "bg-gray-100"} ${bt.className ? bt.className : ''} ${bt.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={bt.disabled}
        >
            {bt.text}
        </button>
    );
}

export default Button;