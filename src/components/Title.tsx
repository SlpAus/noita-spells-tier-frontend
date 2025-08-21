import { useMode } from '../contexts/ModeContext';
import { Link } from 'react-router-dom';

interface TitleProps {
    imageFor?: 'spell' | 'perk';
}

// Component for the static, prop-driven image
const StaticTitle = ({ imageFor }: { imageFor: 'spell' | 'perk' }) => {
    const imageUrl = imageFor === 'spell' ? "/images/title_spell.png" : "/images/title_perk.png";
    return (
        <img
            src={imageUrl}
            alt={imageFor === 'spell' ? "Noita Spell Tier" : "Noita Perk Tier"}
            className="w-full h-auto"
            style={{ imageRendering: 'pixelated' }}
        />
    );
};

// Component for the clickable, context-aware title
const InteractiveTitle = () => {
    const { mode } = useMode();
    const oppositeMode = mode === 'spell' ? 'perks' : 'spells'; // Corrected to plural
    const imageUrl = mode === 'spell' ? "/images/title_spell.png" : "/images/title_perk.png"; // Corrected back to singular
    const switchText = oppositeMode === 'perks' ? '↑ 点击切换到天赋投票箱' : '↑ 点击切换到法术投票箱';

    return (
        <Link to={`/${oppositeMode}`} className="w-1/2">
            <img
                src={imageUrl}
                alt={mode === 'spell' ? "Noita Spell Tier" : "Noita Perk Tier"}
                className="w-full h-auto"
                style={{ imageRendering: 'pixelated' }}
            />
            <p className="text-center text-white text-lg font-bold mt-2">{switchText}</p>
        </Link>
    );
};


const Title = ({ imageFor }: TitleProps) => {
    if (imageFor) {
        return <StaticTitle imageFor={imageFor} />;
    }
    return <InteractiveTitle />;
}

export default Title;