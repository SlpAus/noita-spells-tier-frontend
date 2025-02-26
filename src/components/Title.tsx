// import { useState } from "react";
// import Button from "./UI/Button";

import Box from "./UI/Box";

const Title = () => {
    // const [titleIndex, setTitleIndex] = useState(0);
    // const TitleList: string[] = ["道具", "角色"];
    // const onClick = () => {
    //     const TitleSize = TitleList.length;
    //     setTitleIndex((titleIndex + 1) % TitleSize);
    // }
    return (
        <div className="space-y-3">
            <h1 className="text-4xl font-bold text-red-500">以撒的结合</h1>
            <h1 className="text-4xl font-bold text-red-500">道具投票箱</h1>
        </div>

    )
}

export default Title;