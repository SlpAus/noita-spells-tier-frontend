import { useEffect, useState } from "react";
import Box from "./UI/Box";

export default function Rule() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <Box className="space-y-4">
            <p className={`text-2xl font-bold text-red-500 animate-slide-fade`}>
                3.3日更新：1. 现在可以通过域名访问本网站了<a href="https://vote.terras.su">https://vote.terras.su</a>  2. 添加了主动道具筛选功能，可以选择是否筛选主动道具了！
            </p>
            <p className={`text-2xl font-bold text-red-300 animate-slide-fade`}>
                新功能添加：1. 现在可以查看道具的1v1的对位数据了！但是由于本人的失误，丢失了许多数据，导致对位数据的数量和准确性目前还不足，还要靠大家多多投票了QAQ。
                <br />2.现在排行榜可以按照分数 胜率 总数进行升序或降序排列了！大家查看最强最弱道具都不用翻到最下面了！并且点击两个排行榜的标题都可以切换排行榜的收缩展开状态了！<br />
                3.屏幕最右边添加了一个目录，可以自动定位到想要的功能了！
            </p>
            <p className={`text-xl font-bold animate-slide-fade`}>
                规则：假设你面前是一个二选一道具房，请你在出现的道具中，结合各种实战场景选择你最可能选择的道具。投票采取ELO机制，每个道具的ELO分数会根据你的选择和其他人的选择动态进行调整。最后根据分数和胜率进行排名。
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