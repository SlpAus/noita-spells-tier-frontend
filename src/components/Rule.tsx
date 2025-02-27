import { useEffect, useState } from "react";
import Box from "./UI/Box";

export default function Rule() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <Box className="space-y-4">
            <p className={`text-xl font-bold animate-slide-fade`}>
                规则：假设你面前是一个二选一道具房，请你在出现的道具中，结合各种实战场景选择你最可能选择的道具。投票采取ELO机制，每个道具的ELO分数会根据你的选择和其他人的选择动态进行调整。最后根据分数和胜率进行排名。
            </p>
            <p className={`text-xl font-semibold animate-slide-fade`}>
                由于存在筛选器，小样本的投票可能会出现误差，例如筛选后只有四级道具，那么由于对手过于强，可能会导致某些四级道具评分下降。
                于是我们对于筛选过的投票会进行降权处理，以减少这种误差。如果您希望得到更准确的排名，请尽量少使用筛选器(虽然可能会出现狗粮比狗粮的情况)(为了解决这种情况可以适当勾选里罗筛选器)。
            </p>
        </Box>
    );
}