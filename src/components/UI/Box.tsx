import React from 'react';

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div className={`w-full max-w-4xl rounded-xl shadow-lg bg-gray-800 bg-opacity-90 text-gray-200 hover:shadow-2xl transition-shadow duration-300 py-4 px-10 ${className}`}>
            {children}
        </div>
    );
}

export default Box;