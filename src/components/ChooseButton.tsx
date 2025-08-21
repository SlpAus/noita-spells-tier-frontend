// 选择按钮，用于做出选择

import { useState, useEffect } from "react";
import { GetSpellImage } from "../utils/spell/GetSpellImage";
import { GetPerkImage } from "../utils/perk/GetPerkImage";
import { imageSpell } from "../types/spell/spell";
import { imagePerk } from "../types/perk/perk";
import SpellIcon from "./UI/SpellIcon";
import PerkIcon from "./UI/PerkIcon";
import { useMode } from "../contexts/ModeContext";

export interface ChooseButtonProps {
    OnClick_1: () => void; //左赢
    OnClick_2: () => void; //右赢
    OnClick_3: () => void; //都输
    OnClick_4: () => void; //无事发生
}

const spellIds = {
    aWins: "MANA_REDUCE",
    bWins: "REGENERATION_FIELD",
    draw: "TORCH_ELECTRIC",
    skip: "RUBBER_BALL",
};

const perkIds = {
    aWins: "EDIT_WANDS_EVERYWHERE",
    bWins: "REMOVE_FOG_OF_WAR",
    draw: "PERSONAL_LASER",
    skip: "TELEPORTITIS",
};

const useItemIcon = (itemId: string) => {
    const { mode } = useMode();
    const [icon, setIcon] = useState<imageSpell | imagePerk | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchIcon = async () => {
            try {
                const image = mode === 'spell'
                    ? await GetSpellImage(itemId)
                    : await GetPerkImage(itemId);
                if (isMounted) {
                    setIcon(image);
                }
            } catch (err) {
                console.error(`Failed to fetch icon for ${itemId}`, err);
            }
        };

        fetchIcon();

        return () => {
            isMounted = false;
        };
    }, [itemId, mode]);

    return icon;
};

const ChooseButton = (props: { prop: ChooseButtonProps }) => {
    const { mode } = useMode();
    const ids = mode === 'spell' ? spellIds : perkIds;

    const aWinsIcon = useItemIcon(ids.aWins);
    const bWinsIcon = useItemIcon(ids.bWins);
    const drawIcon = useItemIcon(ids.draw);
    const skipIcon = useItemIcon(ids.skip);

    const renderIcon = (icon: imageSpell | imagePerk | null) => {
        if (!icon) return null;
        if (mode === 'spell' && 'type' in icon) {
            return <SpellIcon imageUrl={icon.imageUrl} type={icon.type} />;
        }
        return <PerkIcon imageUrl={icon.imageUrl} />;
    };

    const drawIconClasses = `transition-all duration-300 group-hover:scale-[150%] ${mode === 'perk' ? 'group-hover:grayscale' : ''}`;

    return (
        <div className="flex flex-3 items-center space-x-10">
            <button type="button" onClick={props.prop.OnClick_1} className="group bg-red-800 px-4 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-blue-800 hover:text-white transition-all duration-300">
                <div className="flex items-center space-x-2 justify-center">
                    <div className="-rotate-90 transition-all duration-300 group-hover:rotate-0">{renderIcon(aWinsIcon)}</div>
                    <p className="text-xl">我寻思左边能行</p>
                </div>
            </button>
            <div className="flex flex-col space-y-3">
                <button type="button" onClick={props.prop.OnClick_3} className="group bg-purple-800 text-white px-1 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-500 hover:text-black transition-all duration-300">
                    <div className="flex items-center space-x-2 justify-center">
                        <div className={drawIconClasses}>{renderIcon(drawIcon)}</div>
                        <p className="text-base">还有人类吗？</p>
                    </div>
                </button>
                <button type="button" onClick={props.prop.OnClick_4} className="group bg-green-800 px-1 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-yellow-500 hover:text-white transition-all duration-300">
                    <div className="flex items-center space-x-1 justify-center">
                        <div className="transition-all duration-300 group-hover:rotate-180">{renderIcon(skipIcon)}</div>
                        <p className="text-base">你问我？我怎么知道？</p>
                    </div>
                </button>
            </div>
            <button type="button" onClick={props.prop.OnClick_2} className="group bg-blue-800 px-4 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white transition-all duration-300">
                <div className="flex items-center space-x-2 justify-center">
                    <div className="rotate-90 transition-all duration-300 group-hover:rotate-0">{renderIcon(bWinsIcon)}</div>
                    <p className="text-xl">显然是右边厉害</p>
                </div>
            </button>
        </div>
    );
}

export default ChooseButton;