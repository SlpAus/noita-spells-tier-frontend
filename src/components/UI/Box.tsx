import React from 'react';

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div className={` w-[46rem] rounded-xl shadow-md bg-gray-50 bg-opacity-95 hover:shadow-2xl transition-shadow duration-300  py-4 px-10 ${className}`}>
            {children}
        </div>
    );
}

export default Box;