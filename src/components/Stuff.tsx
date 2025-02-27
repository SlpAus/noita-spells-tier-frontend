import { useState } from "react";
import Box from "./UI/Box";
import { image } from "../types/image";
import { BACKEN_URL } from "../config";

export default function Stuff() {
    const [selectedItems, setSelectedItems] = useState<image[]>([]);

    const handleItemSelect = (item: image) => {
        setSelectedItems([...selectedItems, item]);
    };

    return (
        <div className="flex flex-wrap w-[42rem]">
            <img src={`/images/stuff.png`} alt="Stuff" className="w-full h-auto object-contain" />
        </div>
    );
}