import React from 'react';

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div className="ml-10 w-[44rem] max-w-[44rem] m-0 items-center justify-center">
            <div className={`w-[44rem] rounded-xl shadow-md bg-gray-50 bg-opacity-[93%] hover:shadow-2xl transition-shadow duration-300  py-4 px-10 ${className}`}>
                {children}
            </div>
        </div>

    );
}

export default Box;