import React from 'react';

interface SpellIconProps {
  imageUrl: string;
  type: number;
  alt?: string;
  size?: number; // Optional size prop, defaults to 40px
  className?: string;
}

const SpellIcon: React.FC<SpellIconProps> = ({ imageUrl, type, alt = 'spell icon', size = 40, className }) => {
  const borderUrl = `/images/spell_borders/${type}.png`;
  const containerSize = { width: `${size}px`, height: `${size}px` };
  const imageSize = { width: `${size / 2}px`, height: `${size / 2}px` };

  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ ...containerSize, backgroundColor: '#222933' }}
    >
      {/* Spell Image */}
      <img
        src={imageUrl}
        alt={alt}
        style={{
          ...imageSize,
          imageRendering: 'pixelated',
          zIndex: 0,
        }}
      />
      {/* Border Image */}
      <img
        src={borderUrl}
        alt="spell border"
        className="absolute top-0 left-0"
        style={{
          ...containerSize,
          imageRendering: 'pixelated',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default SpellIcon;