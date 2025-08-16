// 用于展示两个法术，中间标注VS

import ChooseButton, { ChooseButtonProps } from "./ChooseButton";
import Title from './Title';
import Box from './UI/Box';
import { PairedSpell } from "../types/spell";
import SpellIcon from "./UI/SpellIcon";

interface RankingVSProps {
    left: PairedSpell;
    right: PairedSpell;
    ChooseProps: ChooseButtonProps;
    LastVote: string;
}

const SpellDisplay = ({ spell, onVote, className }: { spell: PairedSpell, onVote: () => void, className?: string }) => (
    <button type="button" onClick={onVote} className={`w-full flex flex-col h-full p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors ${className}`}>
        <div className="flex-grow flex items-center justify-center">
            <SpellIcon imageUrl={spell.imageUrl} type={spell.type} size={80} />
        </div>
        <div className="text-center h-24 flex flex-col justify-end">
            <p className="text-xl font-bold">{spell.name}</p>
            <p className="text-sm text-gray-400 mt-1">{spell.description}</p>
        </div>
    </button>
);

const RankingVS = ({ left, right, ChooseProps, LastVote }: RankingVSProps) => {
    return (
        <Box className="flex flex-col h-[40rem] items-center justify-center space-y-6">
            <Title />
            <div className='grid grid-cols-8 gap-x-4 items-stretch justify-center h-[24rem]'>
                <SpellDisplay spell={left} onVote={ChooseProps.OnClick_1} className="col-start-2 col-span-2" />
                <div className="flex flex-col items-center justify-center pt-8 col-span-2">
                    <img
                        src="/images/vs.png"
                        alt="vs"
                        className="w-1/2 h-auto"
                        style={{ imageRendering: 'pixelated' }}
                    />
                    <p className="text-lg text-gray-300 font-semibold text-center mt-8 h-24 break-words">{LastVote}</p>
                </div>
                <SpellDisplay spell={right} onVote={ChooseProps.OnClick_2} className="col-span-2" />
            </div>
            <div className="flex items-center justify-center">
                <ChooseButton prop={ChooseProps} />
            </div>
        </Box>
    );
}

export default RankingVS;