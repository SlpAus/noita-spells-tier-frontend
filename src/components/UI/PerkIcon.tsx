import React from 'react';

interface PerkIconProps {
  imageUrl: string;
  alt?: string;
  size?: number;
  className?: string;
}

const PerkIcon: React.FC<PerkIconProps> = ({ imageUrl, alt = 'perk icon', size = 40, className }) => {
  const containerSize = { width: `${size}px`, height: `${size}px` };

  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 ${className}`}
      style={containerSize}
    >
      <img
        src={imageUrl}
        alt={alt}
        style={{
          ...containerSize,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default PerkIcon;