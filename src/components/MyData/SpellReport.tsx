import React from 'react';
import { UserReport as SpellUserReport, MilestoneVote as SpellMilestoneVote, EncounterRecord as SpellEncounterRecord } from "../../types/spell/report";
import { VOTEResult } from "../../types/votingResult";
import { formatDateToDay, isSameDay, formatItemPairNames, Section } from "./utils";

// Note: Most of these components are heavily customized for the "Spell" context.

export const BasicStatsSection = ({ report }: { report: SpellUserReport }) => {
    const { totalVotes, voteRankpercent, choices, decisionRate, communityDecisionRate } = report;

    const renderDecisionRateText = () => {
        if (decisionRate == null) return null;
        const userRate = decisionRate * 100;
        if (communityDecisionRate != null) {
            const communityRate = communityDecisionRate * 100;
            if (userRate >= communityRate) {
                return <p>当面对艰难抉择时，你有 <span className="font-bold">{userRate.toFixed(1)}%</span> 的倾向给出明确的判断，这份果决超过了社区 <span className="font-bold">{communityRate.toFixed(1)}%</span> 的平均水平。与其犹豫不决，不如仗剑直言。</p>;
            } else {
                return <p>举棋不定间，自有深思熟虑。你有 <span className="font-bold">{userRate.toFixed(1)}%</span> 的倾向给出明确的判断，低于 <span className="font-bold">{communityRate.toFixed(1)}%</span> 的社区平均值。相较于一言蔽之，你更愿意在充分的权衡中，看到法术无限的可能。</p>;
            }
        }
        return <p>当面对艰难抉择时，你有 <span className="font-bold">{userRate.toFixed(1)}%</span> 的倾向给出明确的判断。与其犹豫不决，不如仗剑直言。</p>;
    };

    return (
        <Section title="基础统计">
            <p>截至今日，你一共投出了 <span className="font-bold">{totalVotes}</span> 张珍贵的选票。对法术对决的持续关注，让你走在了 <span className="font-bold">{((1 - voteRankpercent) * 100).toFixed(1)}%</span> 的参与者前面。每张选票，都是你思考的见证。</p>
            <p>在这些对决中，你有 <span className="font-bold">{choices.wins}</span> 次明确了心中的胜者，<span className="font-bold">{choices.draw}</span> 次将二者弃若敝履，还有 <span className="font-bold">{choices.skip}</span> 次，你选择静观其变，让时间给出答案。</p>
            {renderDecisionRateText()}
        </Section>
    );
};

export const TendenciesSection = ({ report }: { report: SpellUserReport }) => {
    const { communityConsistencyIndex, upsetTendency } = report;

    const renderConsistencyText = () => {
        if (communityConsistencyIndex == null) return null;
        const consistencyRate = communityConsistencyIndex * 100;
        if (consistencyRate >= 50) {
            return <p>你的判断与大众的视野不谋而合。在 <span className="font-bold">{consistencyRate.toFixed(1)}%</span> 的投票里，你做出了和玩家社区一致的选择。这份敏锐，让你与社区主流观点形成了共鸣。</p>;
        } else {
            return <p>你对法术的世界有独到的理解。仅在 <span className="font-bold">{consistencyRate.toFixed(1)}%</span> 的投票里，你认同玩家社区的一般判断。这份卓尔不群的远见，构成了你独特的投票哲学。</p>;
        }
    };

    const renderUpsetTendencyText = () => {
        if (upsetTendency == null) return null;
        const upsetRate = upsetTendency * 100;
        if (upsetRate < 50) {
            return <p>你的以弱胜强指数为 <span className="font-bold">{upsetRate.toFixed(1)}%</span>。你对法术做出的评判客观而稳健，在一定程度上，你对法术强度的理解可以反映玩家群体的观点。</p>;
        } else {
            return <p>你的以弱胜强指数为 <span className="font-bold">{upsetRate.toFixed(1)}%</span>。比起大众眼中的强者，你似乎更热衷于挖掘那些被低估的法术所蕴含的潜能。你的每一次选择，都在为未来的无限可能发声。</p>;
        }
    };

    return (
        <Section title="投票倾向">
            {renderConsistencyText()}
            {renderUpsetTendencyText()}
        </Section>
    );
};

export const HighlightsSection = ({ report }: { report: SpellUserReport }) => {
    const { mostChosen, highestWinRate, chosenOne, nemesis, mostSubversive } = report;

    const renderMostSubversive = () => {
        if (!mostSubversive) return null;
        const [spellA, spellB] = formatItemPairNames(mostSubversive.spellA, mostSubversive.spellB);
        const winner = mostSubversive.result === VOTEResult.A_WINS ? spellA : spellB;
        const loser = mostSubversive.result === VOTEResult.A_WINS ? spellB : spellA;
        return (
            <p>
                第 <span className="font-bold">{mostSubversive.voteNumber}</span> 次投票，是值得铭记的一幕。
                面对社区排名高达 <span className="font-bold">{loser.rank!}</span> 的法术 <span className="font-bold">{loser.name}</span>，
                你力排众议，将关键一票投给了社区排名仅为 <span className="font-bold">{winner.rank!}</span> 的 <span className="font-bold">{winner.name}</span>。
                这真是充满魄力的一次选择！
            </p>
        );
    };

    return (
        <Section title="趣味高光时刻">
            {mostChosen && <p>在众多法术之中，有一个名字被你反复呼唤——<span className="font-bold">{mostChosen.name}</span>！你共计为它投出 <span className="font-bold">{mostChosen.voteCount}</span> 票。在与不同法术的对决中，你始终认可它的不凡实力。</p>}
            {highestWinRate && <p>你十分确信，<span className="font-bold">{highestWinRate.name}</span> 是值得托付的法术。在它参与的对局中，有 <span className="font-bold">{(highestWinRate.winRate * 100).toFixed(1)}%</span> 的场次，你选择宣告它的胜利。它，就是你的常胜将军。</p>}
            {chosenOne && <p>你拥有发现璞玉的慧眼。当社区对 <span className="font-bold">{chosenOne.name}</span> 的平均认可度仅有 <span className="font-bold">{(chosenOne.communityScoreRate * 100).toFixed(1)}%</span> 时，你给予了它 <span className="font-bold">{(chosenOne.winRate * 100).toFixed(1)}%</span> 的胜率，视它为你的天选之子。</p>}
            {nemesis && <p>英雄总有宿敌。即使 <span className="font-bold">{nemesis.name}</span> 在社区中享有 <span className="font-bold">{(nemesis.communityScoreRate * 100).toFixed(1)}%</span> 认可度的盛誉，它也仅仅赢得了你 <span className="font-bold">{(nemesis.winRate * 100).toFixed(1)}%</span> 的选择。在你的评判标准中，盛名并非通行无阻的凭证。</p>}
            {renderMostSubversive()}
        </Section>
    );
};

const MilestoneVoteDisplay = ({ vote }: { vote: SpellMilestoneVote }) => {
    const [spellA, spellB] = formatItemPairNames(vote.spellA, vote.spellB);

    let voteActionText;
    switch (vote.result) {
        case VOTEResult.A_WINS:
        case VOTEResult.B_WINS:
        const winner = vote.result === VOTEResult.A_WINS ? spellA : spellB;
        const loser = vote.result === VOTEResult.A_WINS ? spellB : spellA;
            voteActionText = <>将票投给了 <span className="font-bold">{winner.name}</span>，助其战胜 <span className="font-bold">{loser.name}</span></>;
            break;
        case VOTEResult.DRAW:
            voteActionText = <>判定 <span className="font-bold">{spellA.name}</span> 与 <span className="font-bold">{spellB.name}</span> 在此战中两败俱伤</>;
            break;
        case VOTEResult.SKIP:
            voteActionText = <>选择为 <span className="font-bold">{spellA.name}</span> 和 <span className="font-bold">{spellB.name}</span> 的对决留下悬念</>;
            break;
    }

    let milestoneText;
    switch (vote.voteNumber) {
        case 25:
            milestoneText = <>你的旅程开启新篇。在你的第 <span className="font-bold">25</span> 次投票里，你{voteActionText}。</>;
            break;
        case 50:
            milestoneText = <>在第 <span className="font-bold">50</span> 次投票中，你{voteActionText}。这半百之数，见证了你日益敏锐的洞察力。</>;
            break;
        case 100:
            milestoneText = <>在第 <span className="font-bold">100</span> 次投票这个值得纪念的时刻，你{voteActionText}。百炼成钢，你的每一次投票都掷地有声。</>;
            break;
        case 250:
            milestoneText = <>你完成了第 <span className="font-bold">250</span> 次投票，{voteActionText}。你的判断，已在此间留下深刻的印记。</>;
            break;
        case 500:
            milestoneText = <>你到达了第 <span className="font-bold">500</span> 次投票这一历史性时刻，{voteActionText}。无数的抉择，沉淀为你对法术世界的深刻理解。</>;
            break;
        case 1000:
            milestoneText = <>这已然是一部由你书写的传奇。在这不啻奇迹的第 <span className="font-bold">1000</span> 次投票里，你{voteActionText}。</>;
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

const EncounterDisplay = ({ encounter, type }: { encounter: SpellEncounterRecord, type: "Top" | "Bottom" }) => {
    if (!encounter) return null;

    const { voteNumber, result, date } = encounter;
    const [spellA, spellB] = formatItemPairNames(encounter.spellA, encounter.spellB);

    if (type === "Top") {
        let encounterDescription;
        if (encounter.specialA !== encounter.specialB) {
            const specialSpell = encounter.specialA ? spellA : spellB;
            const otherSpell = encounter.specialA ? spellB : spellA;

            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? spellA : spellB;
                    if (winner.id === specialSpell.id) {
                        encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，排名为 <span className="font-bold">{specialSpell.rank!}</span> 的巅峰法术 <span className="font-bold">{specialSpell.name}</span>，名不虚传地战胜了排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span>。</>;
                    } else {
                        encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，排名为 <span className="font-bold">{specialSpell.rank!}</span> 的巅峰法术 <span className="font-bold">{specialSpell.name}</span>，出人意料地落败于排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span>。</>;
                    }
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，即使是排名为 <span className="font-bold">{specialSpell.rank!}</span> 的巅峰法术 <span className="font-bold">{specialSpell.name}</span>，也和排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span> 同样没能赢得你的认可。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{specialSpell.rank!}</span> 的巅峰法术 <span className="font-bold">{specialSpell.name}</span> 和排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span>，选择为这场对局留下悬念。</>;
                    break;
            }
        } else {
            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? spellA : spellB;
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，见证了一场巅峰对决。排名为 <span className="font-bold">{spellA.rank!}</span> 的 <span className="font-bold">{spellA.name}</span> 和排名为 <span className="font-bold">{spellB.rank!}</span> 的 <span className="font-bold">{spellB.name}</span> 相遇，最终 <span className="font-bold">{winner.name}</span> 以微弱优势胜出。</>;
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，当排名为 <span className="font-bold">{spellA.rank!}</span> 的 <span className="font-bold">{spellA.name}</span> 和排名为 <span className="font-bold">{spellB.rank!}</span> 的 <span className="font-bold">{spellB.name}</span> 狭路相逢，你却认为二者都不能入你的法眼。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，当星辰交汇，选择了仰望排名为 <span className="font-bold">{spellA.rank!}</span> 的 <span className="font-bold">{spellA.name}</span> 和排名为 <span className="font-bold">{spellB.rank!}</span> 的 <span className="font-bold">{spellB.name}</span>，而非给出自己的评判。</>;
                    break;
            }
        }
        return <p>你与巅峰法术的第一次相遇，是在 <span className="font-bold">{formatDateToDay(date)}</span> 这一天。{encounterDescription}</p>;
    } else { // Bottom
        let encounterDescription;
        if (encounter.specialA !== encounter.specialB) {
            const specialSpell = encounter.specialA ? spellA : spellB;
            const otherSpell = encounter.specialA ? spellB : spellA;

            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? spellA : spellB;
                    if (winner.id === specialSpell.id) {
                        encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，勇敢地将票投给排名为 <span className="font-bold">{specialSpell.rank!}</span> 的垫底法术 <span className="font-bold">{specialSpell.name}</span>，令它爆冷战胜了排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span>。</>;
                    } else {
                        encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，排名为 <span className="font-bold">{specialSpell.rank!}</span> 的垫底法术 <span className="font-bold">{specialSpell.name}</span> 不出所料地落败于排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span>。这些不期而遇，充实了你的投票之旅。</>;
                    }
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，将排名为 <span className="font-bold">{specialSpell.rank!}</span> 的垫底法术 <span className="font-bold">{specialSpell.name}</span> 连着排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span> 一并拒绝。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{specialSpell.rank!}</span> 的垫底法术 <span className="font-bold">{specialSpell.name}</span> 和排名为 <span className="font-bold">{otherSpell.rank!}</span> 的 <span className="font-bold">{otherSpell.name}</span>，选择为这次对局保留一份神秘。</>;
                    break;
            }
        } else {
            switch (result) {
                case VOTEResult.A_WINS:
                case VOTEResult.B_WINS:
                    const winner = result === VOTEResult.A_WINS ? spellA : spellB;
                    encounterDescription = <>你的第 <span className="font-bold">{voteNumber}</span> 票见证了一场奇特的对决，在排名为 <span className="font-bold">{spellA.rank!}</span> 的 <span className="font-bold">{spellA.name}</span> 和排名为 <span className="font-bold">{spellB.rank!}</span> 的 <span className="font-bold">{spellB.name}</span> 中，你最终选择了 <span className="font-bold">{winner.name}</span> 作为胜利者。</>;
                    break;
                case VOTEResult.DRAW:
                    encounterDescription = <>在你的第 <span className="font-bold">{voteNumber}</span> 票里，面对排名为 <span className="font-bold">{spellA.rank!}</span> 的 <span className="font-bold">{spellA.name}</span> 和排名为 <span className="font-bold">{spellB.rank!}</span> 的 <span className="font-bold">{spellB.name}</span>，你不留情面地将它们全部拒绝。</>;
                    break;
                case VOTEResult.SKIP:
                    encounterDescription = <>你在第 <span className="font-bold">{voteNumber}</span> 票里，仔细考量了排名为 <span className="font-bold">{spellA.rank!}</span> 的 <span className="font-bold">{spellA.name}</span> 和排名为 <span className="font-bold">{spellB.rank!}</span> 的 <span className="font-bold">{spellB.name}</span>，最终没有做出选择。</>;
                    break;
            }
        }
        return <p>在 <span className="font-bold">{formatDateToDay(date)}</span> 这一天，你第一次遇到了那些被社区最不看好的法术。{encounterDescription}</p>;
    }
};

export const MilestonesSection = ({ report }: { report: SpellUserReport }) => {
    const { firstVote, milestones, busiestDay, firstEncounterTop, firstEncounterBottom } = report;

    const renderFirstVote = () => {
        if (!firstVote) return null;
        const [spellA, spellB] = formatItemPairNames(firstVote.spellA, firstVote.spellB);
        let voteDescription;
        switch (firstVote.result) {
            case VOTEResult.A_WINS:
                voteDescription = <>在 <span className="font-bold">{spellA.name}</span> 和 <span className="font-bold">{spellB.name}</span> 之间，你选择了前者</>;
                break;
            case VOTEResult.B_WINS:
                voteDescription = <>在 <span className="font-bold">{spellA.name}</span> 和 <span className="font-bold">{spellB.name}</span> 之间，你选择了后者</>;
                break;
            case VOTEResult.DRAW:
                voteDescription = <>你认为 <span className="font-bold">{spellA.name}</span> 和 <span className="font-bold">{spellB.name}</span> 均有不足，将它们一并摒弃</>;
                break;
            case VOTEResult.SKIP:
                voteDescription = <>面对 <span className="font-bold">{spellA.name}</span> 和 <span className="font-bold">{spellB.name}</span> 的对决，你选择保留意见</>;
                break;
        }
        return <p>一切故事都有一个开始。在 <span className="font-bold">{formatDateToDay(firstVote.date)}</span>，你投出了意义非凡的第一票，{voteDescription}，这是你传奇旅程的序章。</p>;
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
        return <p>{dateText}，你创下了投出 <span className="font-bold">{voteCount}</span> 票的记录。那天一定发生了什么特别精彩的对决吧？</p>;
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