import React from 'react';
import { UserReport as PerkUserReport, MilestoneVote as PerkMilestoneVote, EncounterRecord as PerkEncounterRecord } from "../../types/perk/report";
import { VOTEResult } from "../../types/votingResult";
import { formatDateToDay, isSameDay, formatItemPairNames, Section } from "./utils";

// Note: Most of these components are heavily customized for the "Perk" context.

export const BasicStatsSection = ({ report }: { report: PerkUserReport }) => {
    const { totalVotes, voteRankpercent, choices, decisionRate, communityDecisionRate } = report;

    const renderDecisionRateText = () => {
        if (decisionRate == null) return null;
        const userRate = decisionRate * 100;
        if (communityDecisionRate != null) {
            const communityRate = communityDecisionRate * 100;
            if (userRate >= communityRate) {
                return <p>当选择陷入胶着时，你有 <span className="font-bold">{userRate.toFixed(1)}%</span> 的倾向给出清晰的判断，这份果决超过了社区 <span className="font-bold">{communityRate.toFixed(1)}%</span> 的平均水平。对游戏环境的精准把控，让你对天赋选择洞若观火。</p>;
            } else {
                return <p>一时的沉默，是为了更长远的布局。你有 <span className="font-bold">{userRate.toFixed(1)}%</span> 的倾向给出明确的判断，低于 <span className="font-bold">{communityRate.toFixed(1)}%</span> 的社区平均值。你认为天赋的选择需要视时而定，不愿做出粗浅的决定。</p>;
            }
        }
        return <p>当选择陷入胶着时，你有 <span className="font-bold">{userRate.toFixed(1)}%</span> 的倾向给出清晰的判断。对游戏环境的精准把控，让你对天赋选择洞若观火。</p>;
    };

    return (
        <Section title="基础统计">
            <p>截至今日，你一共投出了 <span className="font-bold">{totalVotes}</span> 张珍贵的选票。对天赋投票的热情，让你走在了 <span className="font-bold">{((1 - voteRankpercent) * 100).toFixed(1)}%</span> 的参与者前面。每张选票，都是你对游戏理解的无私分享。</p>
            <p>在这些对决中，你有 <span className="font-bold">{choices.wins}</span> 次明确了心中的胜者，<span className="font-bold">{choices.draw}</span> 次对二者不屑一顾，还有 <span className="font-bold">{choices.skip}</span> 次，你把选择的接力棒交予他人，聆听玩家社区的意见。</p>
            {renderDecisionRateText()}
        </Section>
    );
};

export const TendenciesSection = ({ report }: { report: PerkUserReport }) => {
    const { communityConsistencyIndex, upsetTendency } = report;

    const renderConsistencyText = () => {
        if (communityConsistencyIndex == null) return null;
        const consistencyRate = communityConsistencyIndex * 100;
        if (consistencyRate >= 50) {
            return <p>你的判断与大众的观点不谋而合。在 <span className="font-bold">{consistencyRate.toFixed(1)}%</span> 的投票里，你的选择与社区的主流意见达成一致。你有着对优秀天赋的直觉，总能做出明智的选择。</p>;
        } else {
            return <p>你对天赋的运用有着独到的见解。仅在 <span className="font-bold">{consistencyRate.toFixed(1)}%</span> 的投票里，你认同社区的主流观点。你剑走偏锋，愿意让那些大众视野外的天赋成为你的助力。</p>;
        }
    };

    const renderUpsetTendencyText = () => {
        if (upsetTendency == null) return null;
        const upsetRate = upsetTendency * 100;
        if (upsetRate < 50) {
            return <p>你的以弱胜强指数为 <span className="font-bold">{upsetRate.toFixed(1)}%</span>。你对天赋价值的评判客观而审慎，你的选择精准地量化了各个天赋在大多数情境中的核心价值。</p>;
        } else {
            return <p>你的以弱胜强指数为 <span className="font-bold">{upsetRate.toFixed(1)}%</span>。比起那些公认的强力天赋，你更善于发挥那些冷门选项在特定构筑下的威力。你不甘于思路固化，玩家社区也为你的思考而侧目。</p>;
        }
    };

    return (
        <Section title="投票倾向">
            {renderConsistencyText()}
            {renderUpsetTendencyText()}
        </Section>
    );
};

export const HighlightsSection = ({ report }: { report: PerkUserReport }) => {
    const { mostChosen, highestWinRate, chosenOne, nemesis, mostSubversive } = report;

    const renderMostSubversive = () => {
        if (!mostSubversive) return null;
        const [perkA, perkB] = formatItemPairNames(mostSubversive.perkA, mostSubversive.perkB);
        const winner = mostSubversive.result === VOTEResult.A_WINS ? perkA : perkB;
        const loser = mostSubversive.result === VOTEResult.A_WINS ? perkB : perkA;
        return (
            <p>
                第 <span className="font-bold">{mostSubversive.voteNumber}</span> 次投票，映照着你深邃的思考。
                面对社区排名高达 <span className="font-bold">{loser.rank!}</span> 的 <span className="font-bold">{loser.name}</span>，
                你坚持己见，选择支持社区排名仅为 <span className="font-bold">{winner.rank!}</span> 的 <span className="font-bold">{winner.name}</span>。
                这独属于你的理解，是你向玩家社区的自信表达。
            </p>
        );
    };

    return (
        <Section title="趣味高光时刻">
            {mostChosen && <p>在众多天赋之中，有一个名字始终回应你的期待——<span className="font-bold">{mostChosen.name}</span>！你共计为它投出 <span className="font-bold">{mostChosen.voteCount}</span> 票。对你而言，它是那个可以不假思索做出的选择。</p>}
            {highestWinRate && <p>毫无疑问，<span className="font-bold">{highestWinRate.name}</span> 是深得你信任的伙伴。在它出现的对局中，有 <span className="font-bold">{(highestWinRate.winRate * 100).toFixed(1)}%</span> 的场次，你选择令它胜出。它，一直被你寄予厚望。</p>}
            {chosenOne && <p>你不愿放弃大众眼中的顽石。当 <span className="font-bold">{chosenOne.name}</span> 在社区中的平均认可度仅有 <span className="font-bold">{(chosenOne.communityScoreRate * 100).toFixed(1)}%</span> 时，你却用 <span className="font-bold">{(chosenOne.winRate * 100).toFixed(1)}%</span> 的胜率令它脱颖而出，视它为你的秘密武器。</p>}
            {nemesis && <p>当世界追逐火焰时，你内心的冰山自有其巍峨。即使 <span className="font-bold">{nemesis.name}</span> 以 <span className="font-bold">{(nemesis.communityScoreRate * 100).toFixed(1)}%</span> 的认同度风靡于社区，它也仅仅赢得了你 <span className="font-bold">{(nemesis.winRate * 100).toFixed(1)}%</span> 的选择。比起众口铄金的赞誉，你更相信亲手验证过的价值。</p>}
            {renderMostSubversive()}
        </Section>
    );
};

const MilestoneVoteDisplay = ({ vote }: { vote: PerkMilestoneVote }) => {
    const [perkA, perkB] = formatItemPairNames(vote.perkA, vote.perkB);

    let voteActionText;
    switch (vote.result) {
        case VOTEResult.A_WINS:
        case VOTEResult.B_WINS:
        const winner = vote.result === VOTEResult.A_WINS ? perkA : perkB;
        const loser = vote.result === VOTEResult.A_WINS ? perkB : perkA;
            voteActionText = <>将票投给了 <span className="font-bold">{winner.name}</span>，令其战胜 <span className="font-bold">{loser.name}</span></>;
            break;
        case VOTEResult.DRAW:
            voteActionText = <>裁定 <span className="font-bold">{perkA.name}</span> 与 <span className="font-bold">{perkB.name}</span> 在此战中二者皆输</>;
            break;
        case VOTEResult.SKIP:
            voteActionText = <>对 <span className="font-bold">{perkA.name}</span> 和 <span className="font-bold">{perkB.name}</span> 的对决存而不议</>;
            break;
    }

    let milestoneText;
    switch (vote.voteNumber) {
        case 25:
            milestoneText = <>你的表达落笔新卷。在你的第 <span className="font-bold">25</span> 次投票里，你{voteActionText}。</>;
            break;
        case 50:
            milestoneText = <>第 <span className="font-bold">50</span> 次投票，是深思熟虑的又一证明。你{voteActionText}。半百之数，见证着你的决断日益凝练。</>;
            break;
        case 100:
            milestoneText = <>在第 <span className="font-bold">100</span> 次投票这个值得纪念的时刻，你{voteActionText}。百川归海，你的第一百票初显大家风范。</>;
            break;
        case 250:
            milestoneText = <>你完成了第 <span className="font-bold">250</span> 次投票，{voteActionText}。二百五十次权衡，你的思辨已为后来者留下了清晰可循的车辙。</>;
            break;
        case 500:
            milestoneText = <>你到达了第 <span className="font-bold">500</span> 次投票这一历史性时刻，{voteActionText}。数不尽的权衡，沉淀为你对天赋体系的深刻洞见。</>;
            break;
        case 1000:
            milestoneText = <>这已然是一部由你的思想铸成的典籍。在这不啻奇迹的第 <span className="font-bold">1000</span> 次投票里，你{voteActionText}。</>;
            break;
        default:
            return null;
    }

    return (
        <p>
            <span className="font-bold">{formatDateToDay(vote.date)}</span>，{milestoneText}
        </p>
    );
};

const EncounterDisplay = ({ encounter, type }: { encounter: PerkEncounterRecord, type: "Top" | "Bottom" }) => {
    if (!encounter) return null;

    const { voteNumber, result, date } = encounter;
    const [perkA, perkB] = formatItemPairNames(encounter.perkA, encounter.perkB);

    if (type === "Top") {
        let encounterDescription;
        if (encounter.specialA !== encounter.specialB) {
            const specialPerk = encounter.specialA ? perkA : perkB;
            const otherPerk = encounter.specialA ? perkB : perkA;

            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? perkA : perkB;
                    if (winner.id === specialPerk.id) {
                        encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，排名为 <span className="font-bold">{specialPerk.rank!}</span> 的顶级天赋 <span className="font-bold">{specialPerk.name}</span> 众望所归地战胜了排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span>，赢得了你的青睐。</>;
                    } else {
                        encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{specialPerk.rank!}</span> 的顶级天赋 <span className="font-bold">{specialPerk.name}</span>，毅然将票投给了排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span>。</>;
                    }
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，即使是排名为 <span className="font-bold">{specialPerk.rank!}</span> 的顶级天赋 <span className="font-bold">{specialPerk.name}</span>，也和排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span> 一样，未能触及你的评判标准。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{specialPerk.rank!}</span> 的顶级天赋 <span className="font-bold">{specialPerk.name}</span> 和排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span>，选择让这场交锋暂无定论。</>;
                    break;
            }
        } else {
            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? perkA : perkB;
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面临了一场艰难的权衡。排名为 <span className="font-bold">{perkA.rank!}</span> 的 <span className="font-bold">{perkA.name}</span> 和排名为 <span className="font-bold">{perkB.rank!}</span> 的 <span className="font-bold">{perkB.name}</span> 相遇，最终你以毫厘之差将票投给了 <span className="font-bold">{winner.name}</span>。</>;
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，当排名为 <span className="font-bold">{perkA.rank!}</span> 的 <span className="font-bold">{perkA.name}</span> 和排名为 <span className="font-bold">{perkB.rank!}</span> 的 <span className="font-bold">{perkB.name}</span> 狭路相逢，你却认为二者都不能入你的法眼。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，当星辰交汇，选择了仰望排名为 <span className="font-bold">{perkA.rank!}</span> 的 <span className="font-bold">{perkA.name}</span> 和排名为 <span className="font-bold">{perkB.rank!}</span> 的 <span className="font-bold">{perkB.name}</span>，而非给出自己的评判。</>;
                    break;
            }
        }
        return <p>你第一次审视顶级天赋，是在 <span className="font-bold">{formatDateToDay(date)}</span> 这一天。{encounterDescription}</p>;
    } else { // Bottom
        let encounterDescription;
        if (encounter.specialA !== encounter.specialB) {
            const specialPerk = encounter.specialA ? perkA : perkB;
            const otherPerk = encounter.specialA ? perkB : perkA;

            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? perkA : perkB;
                    if (winner.id === specialPerk.id) {
                        encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，认为排名为 <span className="font-bold">{specialPerk.rank!}</span> 的垫底天赋 <span className="font-bold">{specialPerk.name}</span> 蕴含被大众低估的能量。凭借你的支持，它得以战胜排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span>。</>;
                    } else {
                        encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，排名为 <span className="font-bold">{specialPerk.rank!}</span> 的垫底天赋 <span className="font-bold">{specialPerk.name}</span>，落败于排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span>，验证了社区的普遍观点。</>;
                    }
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，排名为 <span className="font-bold">{specialPerk.rank!}</span> 的垫底天赋 <span className="font-bold">{specialPerk.name}</span> 连着排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span>，都未能进入你的选择范畴。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{specialPerk.rank!}</span> 的垫底天赋 <span className="font-bold">{specialPerk.name}</span> 和排名为 <span className="font-bold">{otherPerk.rank!}</span> 的 <span className="font-bold">{otherPerk.name}</span>，选择不予置评，让时间验证它们的价值。</>;
                    break;
            }
        } else {
            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? perkA : perkB;
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{perkA.rank!}</span> 的 <span className="font-bold">{perkA.name}</span> 和排名为 <span className="font-bold">{perkB.rank!}</span> 的 <span className="font-bold">{perkB.name}</span> 都有明显瑕疵的两难权衡，最终判定 <span className="font-bold">{winner.name}</span> 尚有可取之处。</>;
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，对排名为 <span className="font-bold">{perkA.rank!}</span> 的 <span className="font-bold">{perkA.name}</span> 和排名为 <span className="font-bold">{perkB.rank!}</span> 的 <span className="font-bold">{perkB.name}</span> 进行了审视，最终裁定二者均不具备胜利的资格。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{perkA.rank!}</span> 的 <span className="font-bold">{perkA.name}</span> 和排名为 <span className="font-bold">{perkB.rank!}</span> 的 <span className="font-bold">{perkB.name}</span>，最终放弃了这次选择，因为有价值的讨论需要更有价值的选项。</>;
                    break;
            }
        }
        return <p>在 <span className="font-bold">{formatDateToDay(date)}</span> 这一天，你首次考量那些被大众忽视的天赋。{encounterDescription}</p>;
    }
};

export const MilestonesSection = ({ report }: { report: PerkUserReport }) => {
    const { firstVote, milestones, busiestDay, firstEncounterTop, firstEncounterBottom } = report;

    const renderFirstVote = () => {
        if (!firstVote) return null;
        const [perkA, perkB] = formatItemPairNames(firstVote.perkA, firstVote.perkB);
        let voteDescription;
        switch (firstVote.result) {
            case VOTEResult.A_WINS:
                voteDescription = <>在 <span className="font-bold">{perkA.name}</span> 和 <span className="font-bold">{perkB.name}</span> 之间，你选择了前者</>;
                break;
            case VOTEResult.B_WINS:
                voteDescription = <>在 <span className="font-bold">{perkA.name}</span> 和 <span className="font-bold">{perkB.name}</span> 之间，你选择了后者</>;
                break;
            case VOTEResult.DRAW:
                voteDescription = <>你对 <span className="font-bold">{perkA.name}</span> 和 <span className="font-bold">{perkB.name}</span> 均不满意，将它们一并抛弃</>;
                break;
            case VOTEResult.SKIP:
                voteDescription = <>面对 <span className="font-bold">{perkA.name}</span> 和 <span className="font-bold">{perkB.name}</span> 的对决，你选择保留意见</>;
                break;
        }
        return <p>再宏伟的篇章，也始于一次提笔的决心。在 <span className="font-bold">{formatDateToDay(firstVote.date)}</span>，你投出了意义非凡的第一票，{voteDescription}，这是你思想巨著的扉页。</p>;
    };

    const renderBusiestDay = () => {
        if (!busiestDay) return null;
        const { fromDate, toDate, voteCount } = busiestDay;
        const sameDay = isSameDay(fromDate, toDate);
        const dateText = sameDay ? (
            <>在 <span className="font-bold">{formatDateToDay(fromDate)}</span> 这一天</>
        ) : (
            <>在从 <span className="font-bold">{formatDateToDay(fromDate)}</span> 到 <span className="font-bold">{formatDateToDay(toDate)}</span> 的24小时里</>
        );
        return <p>{dateText}，你连续投出了 <span className="font-bold">{voteCount}</span> 张选票。你的全情投入于此尽情燃烧，想必是遇到了能让思想火花激烈碰撞的精彩对决。</p>;
    };

    return (
        <Section title="里程碑与记录">
            {renderFirstVote()}
            {milestones && milestones.map((m, i) => <MilestoneVoteDisplay key={i} vote={m} />)}
            {renderBusiestDay()}
            {firstEncounterTop && <EncounterDisplay encounter={firstEncounterTop} type="Top" />}
            {firstEncounterBottom && <EncounterDisplay encounter={firstEncounterBottom} type="Bottom" />}
        </Section>
    );
};