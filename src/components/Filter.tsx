import { useState } from "react";
import { filter, itemPoolsMap } from "../types/filter";
import Box from "./UI/Box";

interface FilterProps {
    Filter: filter;
    setFilter: React.Dispatch<React.SetStateAction<filter>>;
    filterNum: number;
    onFilterChange: (Filter: filter) => void;
}

export default function Filter({ setFilter, Filter, onFilterChange, filterNum }: FilterProps) {

    const handleStartQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const startQuality = parseInt(event.target.value);
        setFilter((prevFilter) => ({
            ...prevFilter,
            startQuality,
        }));
        onFilterChange({
            ...Filter,
            startQuality,
        });
    };

    const StartValueSelect = () => {
        return (
            <div className="flex items-center space-x-2 ">
                <label htmlFor="startQuality" className="text-lg font-bold">道具品质起始：</label>
                <select
                    id="startQuality"
                    value={Filter.startQuality}
                    onChange={handleStartQualityChange}
                    className="border rounded px-2 py-1"
                >
                    {[0, 1, 2, 3, 4].map((quality) => (
                        <option key={quality} value={quality}>{quality}</option>
                    ))}
                </select>
            </div>
        )
    }

    const handleEndQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const endQuality = parseInt(event.target.value);
        setFilter((prevFilter) => ({
            ...prevFilter,
            endQuality,
        }));
        onFilterChange({
            ...Filter,
            endQuality,
        });
    };

    const EndValueSelect = () => {
        return (
            <div className="flex items-center space-x-2">
                <label htmlFor="endQuality" className="text-lg font-bold">道具品质终止：</label>
                <select
                    id="endQuality"
                    value={Filter.endQuality}
                    onChange={handleEndQualityChange}
                    className="border rounded px-2 py-1"
                >
                    {[0, 1, 2, 3, 4].filter((quality) => quality >= Filter.startQuality).map((quality) => (
                        <option key={quality} value={quality}>{quality}</option>
                    ))}
                </select>
            </div>
        )
    }

    const handleCanBeLostChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const canBeLost = event.target.value === "true";
        setFilter((prevFilter) => ({
            ...prevFilter,
            canBeLost,
        }));
        onFilterChange({
            ...Filter,
            canBeLost,
        });
    };

    const CanBeLostSelect = () => {
        return (
            <div className="flex items-center space-x-2">
                <label htmlFor="canBeLost" className="text-lg font-bold">被里Lost限制：</label>
                <select
                    id="canBeLost"
                    value={Filter.canBeLost.toString()}
                    onChange={handleCanBeLostChange}
                    className="border rounded px-2 py-1"
                >
                    <option value="true">是</option>
                    <option value="false">否</option>
                </select>
            </div>
        )
    }

    const handleIsActiveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const isActive = parseInt(event.target.value);
        setFilter((prevFilter) => ({
            ...prevFilter,
            isActive,
        }));
        onFilterChange({
            ...Filter,
            isActive,
        });
    };

    const IsActiveSelect = () => {
        return (
            <div className="flex items-center space-x-2">
                <label htmlFor="isActive" className="text-lg font-bold">主动道具：</label>
                <select
                    id="isActive"
                    value={Filter.isActive}
                    onChange={handleIsActiveChange}
                    className="border rounded px-2 py-1"
                >
                    <option value={0}>不限</option>
                    <option value={1}>是</option>
                    <option value={2}>否</option>
                </select>
            </div>
        )
    }

    const handleItemPoolsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setFilter((prevFilter) => {
            const newItemPools = checked
                ? [...prevFilter.itemPools, value]
                : prevFilter.itemPools.filter((pool) => pool !== value);
            onFilterChange({
                ...Filter,
                itemPools: newItemPools,
            });
            return {
                ...prevFilter,
                itemPools: newItemPools,
            };
        });
    };

    const clearItemPools = () => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            itemPools: [],
        }));
        onFilterChange({
            ...Filter,
            itemPools: [],
        });
    };

    const ItemPoolsSelect = () => {
        return (
            <div className="flex justify-center space-y-3 space-x-6 items-center">
                <label className="text-2xl">道具池：</label>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(itemPoolsMap).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={key}
                                checked={Filter.itemPools.includes(key)}
                                onChange={handleItemPoolsChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span>{value}</span>
                        </label>
                    ))}
                </div>
                <button onClick={clearItemPools} className="mt-2 px-4 py-2 border rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300">清除</button>
            </div>
        )
    }

    return (
        <Box className="flex flex-col justify-between items-center space-y-6">
            <p className="text-2xl inline-flex">还剩下<p className="text-red-500 text-2xl font-bold">{filterNum}</p>个道具</p>
            <div className="flex flex-col items-center space-x-4 space-y-4">
                <div className="flex items-center space-x-10">
                    <StartValueSelect />
                    <EndValueSelect />
                </div>
                <div className="flex items-center space-x-10">
                    <CanBeLostSelect />
                    <IsActiveSelect />
                </div>
            </div>
            <ItemPoolsSelect />
        </Box>
    );
}