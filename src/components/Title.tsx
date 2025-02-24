import { useState } from "react";
import Button from "./UI/Button";

const Title = () => {
    const [titleIndex, setTitleIndex] = useState(0);
    const TitleList: string[] = ["道具", "角色"];
    const onClick = () => {
        const TitleSize = TitleList.length;
        setTitleIndex((titleIndex + 1) % TitleSize);
    }
    return (
        <div className="flex items-center space-x-0">
            <h1 className="text-2xl font-semibold">以撒的结合</h1>
            <Button bt={{
                text: TitleList[titleIndex],
                onClick: onClick,
                backGround : "bg-white",
                className: "text-3xl",
            }} />
            <h1 className="text-2xl font-semibold">投票箱</h1>
        </div>
    )
}

export default Title;