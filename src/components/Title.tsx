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
        <Box className="text-center w-max text-red-500">
            <h1 className="text-4xl font-bold">以撒的结合道具投票箱</h1>
        </Box>


    )
}

export default Title;