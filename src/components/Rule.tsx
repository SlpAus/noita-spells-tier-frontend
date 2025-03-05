import { useEffect, useState } from "react";
import Box from "./UI/Box";

export default function Rule() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <Box className="space-y-4">
            <p className={`text-xl font-bold text-red-500 animate-slide-fade`}>
                3.5日更新：1. 更换了香港服务器并且获得了一个域名，vote.qiuy.cloud，可以使用域名访问啦！<br></br>
                2. 添加了定向投票功能，可以进行定向投票啦！但是有以下限制：1. 每个IP每小时最多投票三次 2. 不能投票给相同的道具
                3. 只能让当前排名更低的道具获胜，并且对于前50名的道具，排名差不能超过20 <br></br>
                4. ELO机制的本意是为了在样本量较低时，道具之间能快速拉开差分，但是现在样本量已经足够，ELO机制反而拖累了道具之间的差距，所以我们将会逐步减少ELO机制的影响，最终取消ELO机制，让道具的排名更加稳定。
            </p>
            <p className={`text-xl font-bold text-red-300 animate-slide-fade`}>
                3.4日更新： 1. 修改了排行榜样式，并且没有一个鼠标滚轮受到伤害！<br></br>
                2. 修改了后端API，你们的投票更快更准更难刷票了！(大概)<br></br>
                3. 请大家不要乱投票不要乱投票不要乱投票，务必做出理性的选择!!!!让每个道具落在他该在的地方上！
            </p>

            <p className={`text-xl font-bold animate-slide-fade`}>
                规则：假设你拿到了一个只会生成两个道具的伊甸长子权，请你在出现的道具中，结合各种实战场景选择你最可能选择的道具。投票采取ELO机制，每个道具的ELO分数会根据你的选择和其他人的选择动态进行调整。最后根据分数和胜率进行排名。
            </p>
            <p className="text-xl font-bold animate-slide-fade">
                可以点击道具图片，或是下方的四个按钮进行投票，其中"还有人类吗？"会使得两个道具总场次++，胜率降低，但是不改变分数；
                而"你问我？我怎么知道？"选项则是会跳过这一轮选择，不会对道具产生影响。
            </p>
            <p className={`text-xl font-semibold animate-slide-fade`}>
                由于存在筛选器，小样本的投票可能会出现误差，例如筛选后只有四级道具，那么由于对手过于强，可能会导致某些四级道具评分下降。
                于是我们对于筛选过的投票会进行降权处理以减少这种误差(例如筛选后道具只有50个,那么由这次投票产生的所有影响会减少至50/705)。如果您希望得到更准确的排名，请尽量少使用筛选器(虽然可能会出现狗粮比狗粮的情况)(为了解决这种情况可以适当勾选里罗筛选器)。使用筛选器后若出现
                道具少于2个，会自动将筛选器初始化为默认值，并且弹出一个需要点击关闭的错误提示。
            </p>

        </Box>
    );
}