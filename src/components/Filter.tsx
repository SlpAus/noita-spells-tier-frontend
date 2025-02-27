import { useState } from "react";
import { filter } from "../types/filter";
import Box from "./UI/Box";

interface FilterProps {
    onFilterChange: (Filter: filter) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
    const [startQuality, setStartQuality] = useState(3);
    const [endQuality, setEndQuality] = useState(4);
    const [canBeLost, setCanBeLost] = useState(false);

    const handleStartQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        setStartQuality(value);
        if (value > endQuality) {
            setEndQuality(value);
            onFilterChange({ startQuality: value, endQuality: value, canBeLost });
        } else {
            onFilterChange({ startQuality: value, endQuality, canBeLost });
        }
    };

    const handleEndQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        setEndQuality(value);
        onFilterChange({ startQuality, endQuality: value, canBeLost });
    };

    const handleCanBeLostChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value === "true";
        setCanBeLost(value);
        onFilterChange({ startQuality, endQuality, canBeLost: value });
    };

    return (
        <Box className="flex justify-between items-center px-10 py-5">
            <div className="flex items-center space-x-2">
                <label htmlFor="startQuality" className="text-lg font-bold">道具品质起始：</label>
                <select
                    id="startQuality"
                    value={startQuality}
                    onChange={handleStartQualityChange}
                    className="border rounded px-2 py-1"
                >
                    {[0, 1, 2, 3, 4].map((quality) => (
                        <option key={quality} value={quality}>{quality}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="endQuality" className="text-lg font-bold">道具品质终止：</label>
                <select
                    id="endQuality"
                    value={endQuality}
                    onChange={handleEndQualityChange}
                    className="border rounded px-2 py-1"
                >
                    {[0, 1, 2, 3, 4].filter((quality) => quality >= startQuality).map((quality) => (
                        <option key={quality} value={quality}>{quality}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="canBeLost" className="text-lg font-bold">被里Lost限制：</label>
                <select
                    id="canBeLost"
                    value={canBeLost.toString()}
                    onChange={handleCanBeLostChange}
                    className="border rounded px-2 py-1"
                >
                    <option value="true">是</option>
                    <option value="false">否</option>
                </select>
            </div>
        </Box>

    );
}