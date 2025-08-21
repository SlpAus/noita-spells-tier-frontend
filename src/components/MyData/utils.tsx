import React from 'react';
import { SpellNameRank } from "../../types/spell/report";
import { PerkNameRank } from "../../types/perk/report";

export const formatDateToDay = (dateString: string) => new Date(dateString).toLocaleDateString();

export const isSameDay = (dateString1: string, dateString2: string) => {
    const d1 = new Date(dateString1);
    const d2 = new Date(dateString2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

export const formatItemPairNames = (itemA: SpellNameRank | PerkNameRank, itemB: SpellNameRank | PerkNameRank): [SpellNameRank | PerkNameRank, SpellNameRank | PerkNameRank] => {
    if (itemA.name === itemB.name) {
        return [
            { ...itemA, name: `${itemA.name} (${itemA.id})` },
            { ...itemB, name: `${itemB.name} (${itemB.id})` },
        ];
    }
    return [itemA, itemB];
};

export const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="pt-4">
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <div className="space-y-2 pl-4 border-l-2 border-blue-300">{children}</div>
    </div>
);