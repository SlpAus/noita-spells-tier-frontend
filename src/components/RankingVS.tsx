// 用于展示两个法术/天赋，中间标注VS

import ChooseButton, { ChooseButtonProps } from "./ChooseButton";
import Title from './Title';
import Box from './UI/Box';
import { PairedSpell } from "../types/spell/spell";
import { PairedPerk } from "../types/perk/perk";
import SpellIcon from "./UI/SpellIcon";
import PerkIcon from "./UI/PerkIcon";
import { useMode } from "../contexts/ModeContext";

type VotableItem = PairedSpell | PairedPerk;

interface RankingVSProps {
    left: VotableItem;
    right: VotableItem;
    ChooseProps: ChooseButtonProps;
    LastVote: string;
}

const ItemDisplay = ({ item, onVote, className }: { item: VotableItem, onVote: () => void, className?: string }) => {
    const { mode } = useMode();

    // whitespace-pre-wrap: display \n
    return (
        <button type="button" onClick={onVote} className={`w-full h-full p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors grid grid-rows-[1fr_auto] place-items-center ${className}`}>
            {mode === 'spell' && 'type' in item ? (
                <SpellIcon imageUrl={item.imageUrl} type={item.type} size={80} className="justify-self-center" />
            ) : (
                <PerkIcon imageUrl={item.imageUrl} size={80} className="justify-self-center" />
            )}
            <div className="w-full text-center pt-4 self-end">
                <p className="text-xl font-bold">{item.name}</p>
                <p className="text-sm text-gray-400 mt-1 whitespace-pre-wrap">{item.description}</p>
            </div>
        </button>
    )
};

const RankingVS = ({ left, right, ChooseProps, LastVote }: RankingVSProps) => {
    return (
        <Box className="flex flex-col items-center justify-center space-y-6">
            <Title />
            <div className='w-full grid grid-cols-8 gap-x-4 items-stretch justify-center h-[18rem]'>
                <ItemDisplay item={left} onVote={ChooseProps.OnClick_1} className="col-start-2 col-span-2" />
                <div className="flex flex-col items-center justify-center pt-8 col-span-2">
                    <img
                        src="/images/vs.png"
                        alt="vs"
                        className="w-1/2 h-auto"
                        style={{ imageRendering: 'pixelated' }}
                    />
                    <p className="text-lg text-gray-300 font-semibold text-center mt-8 h-24 break-words">{LastVote}</p>
                </div>
                <ItemDisplay item={right} onVote={ChooseProps.OnClick_2} className="col-span-2" />
            </div>
            <div className="flex items-center justify-center">
                <ChooseButton prop={ChooseProps} />
            </div>
        </Box>
    );
}

export default RankingVS;
