// 选择按钮，用于做出选择

import { useState, useEffect } from "react";
import { GetSpellImage } from "../utils/GetSpellImage";
import { imageSpell } from "../types/spell";
import SpellIcon from "./UI/SpellIcon";

export interface ChooseButtonProps {
    OnClick_1: () => void,//左赢
    OnClick_2: () => void,//右赢
    OnClick_3: () => void,//都输
    OnClick_4: () => void,//无事发生
}

const spellIds = {
    aWins: "MANA_REDUCE",
    bWins: "REGENERATION_FIELD",
    draw: "TORCH_ELECTRIC",
    skip: "RUBBER_BALL",
};

const useSpellIcon = (spellId: string) => {
    const [spellIcon, setSpellIcon] = useState<imageSpell | null>(null);
    useEffect(() => {
        GetSpellImage(spellId)
            .then(setSpellIcon)
            .catch(err => console.error(`Failed to fetch icon for ${spellId}`, err));
    }, [spellId]);
    return spellIcon;
};

const ChooseButton = (props: { prop: ChooseButtonProps }) => {
    const aWinsIcon = useSpellIcon(spellIds.aWins);
    const bWinsIcon = useSpellIcon(spellIds.bWins);
    const drawIcon = useSpellIcon(spellIds.draw);
    const skipIcon = useSpellIcon(spellIds.skip);

    return (
        <div className="flex flex-3 items-center space-x-10">
            <button type="button" onClick={props.prop.OnClick_1} className="group bg-red-800 px-4 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-blue-800 hover:text-white transition-all duration-300">
                <div className="flex items-center space-x-2 justify-center">
                    {aWinsIcon && <div className="-rotate-90 transition-all duration-300 group-hover:rotate-0"><SpellIcon imageUrl={aWinsIcon.imageUrl} type={aWinsIcon.type} /></div>}
                    <p className="text-xl">我寻思左边能行</p>
                </div>
            </button>
            <div className="flex flex-col space-y-3">
                <button type="button" onClick={props.prop.OnClick_3} className="group bg-purple-800 text-white px-1 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-500 hover:text-black transition-all duration-300">
                    <div className="flex items-center space-x-2 justify-center">
                        {drawIcon && <div className="transition-all duration-300 group-hover:scale-[150%]"><SpellIcon imageUrl={drawIcon.imageUrl} type={drawIcon.type} /></div>}
                        <p className="text-base">还有人类吗？</p>
                    </div>
                </button>
                <button type="button" onClick={props.prop.OnClick_4} className="group bg-green-800 px-1 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-yellow-500 hover:text-white transition-all duration-300">
                    <div className="flex items-center space-x-1 justify-center">
                        {skipIcon && <div className="transition-all duration-300 group-hover:rotate-180"><SpellIcon imageUrl={skipIcon.imageUrl} type={skipIcon.type} /></div>}
                        <p className="text-base">你问我？我怎么知道？</p>
                    </div>
                </button>
            </div>
            <button type="button" onClick={props.prop.OnClick_2} className="group bg-blue-800 px-4 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white transition-all duration-300">
                <div className="flex items-center space-x-2 justify-center">
                    {bWinsIcon && <div className="rotate-90 transition-all duration-300 group-hover:rotate-0"><SpellIcon imageUrl={bWinsIcon.imageUrl} type={bWinsIcon.type} /></div>}
                    <p className="text-xl">显然是右边厉害</p>
                </div>
            </button>
        </div>
    );
}

export default ChooseButton;
