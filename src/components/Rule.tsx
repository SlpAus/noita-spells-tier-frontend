import { useEffect, useState } from "react";
import Box from "./UI/Box";

export default function Rule() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <Box>
            <p className={`text-2xl font-bold animate-slide-fade`}>
                规则：请你在出现的道具中，结合自己的经验选择你最可能选择的道具。投票采取ELO机制，每个道具的ELO分数会根据你的选择和其他人的选择动态进行调整。最后根据分数进行排名。
            </p>
        </Box>
    );
}