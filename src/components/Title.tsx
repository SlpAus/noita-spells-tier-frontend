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
            <img src="/images/title.gif"></img>
        </div>

    )
}

export default Title;