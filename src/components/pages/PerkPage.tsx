import React, { useState, useEffect, useRef } from 'react';
import RankingVS from "../RankingVS";
import { ChooseButtonProps } from "../ChooseButton";
import { GetPerkPair } from "../../utils/perk/GetPerkPair";
import { SendPerkVoting } from "../../utils/perk/SendPerkVoting";
import { RankedPerk } from "../../types/perk/perk";
import Rank from "../Rank";
import { GetPerkRanking } from "../../utils/perk/GetPerkRanking";
import Error from "../Error";
import { VOTEResult } from "../../types/votingResult";
import MyData from "../MyData";
import Notice from "../Notice";
import Footer from "../Footer";
import { GetPerkPairAPIResponse } from "../../types/perk/pair";

const PerkPage = () => {
  const [currentPair, setCurrentPair] = useState<GetPerkPairAPIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastVote, setLastVote] = useState<string | null>(null);
  const [rank, setRank] = useState<RankedPerk[]>([]);

  const GetPair = (pair?: GetPerkPairAPIResponse | null) => {
    const params = pair
      ? { excludeA: pair.perkA.id, excludeB: pair.perkB.id }
      : undefined;
    GetPerkPair(params)
      .then((res) => {
        setCurrentPair(res);
      })
      .catch((error) => {
        console.error("Error fetching pair:", error);
        if (error.response?.data?.error) {
          setError(error.response.data.error);
        } else if (error.message) {
          setError(error.message);
        } else {
          setError("无法获取天赋对，请稍后再试");
        }
      });
  };

  const GetRank = () => {
    GetPerkRanking()
      .then((res) => {
        setRank(res);
      })
      .catch((error) => {
        console.error("Error fetching rank:", error);
        if (error.response?.data?.error) {
          setError(error.response.data.error);
        } else if (error.message) {
          setError(error.message);
        } else {
          setError("无法获取排行榜，请稍后再试");
        }
      });
  };

  useEffect(() => {
    GetPair();
    GetRank();
  }, []);

  const vote = async (result: VOTEResult) => {
    if (!currentPair) return;

    const payload = {
      perkA: currentPair.perkA.id,
      perkB: currentPair.perkB.id,
      result: result,
      pairId: currentPair.pairId,
      signature: currentPair.signature,
    };

    SendPerkVoting(payload).then(() => {
      switch (result) {
        case VOTEResult.A_WINS:
        case VOTEResult.B_WINS:
          const winner = result === VOTEResult.A_WINS ? currentPair.perkA : currentPair.perkB;
          const loser = result === VOTEResult.A_WINS ? currentPair.perkB : currentPair.perkA;
          setLastVote(`你选择了 ${winner.name} (排名: ${winner.rank}) 而不是 ${loser.name} (排名: ${loser.rank})`);
          break;
        case VOTEResult.DRAW:
          setLastVote(`你认为 ${currentPair.perkA.name} (排名: ${currentPair.perkA.rank}) 和 ${currentPair.perkB.name} (排名: ${currentPair.perkB.rank}) 都很糟糕！`);
          break;
      }
      GetPair(currentPair); // Fetch a new pair after voting
    }).catch((error) => {
      console.error("Error post vote:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("无法投票，请刷新或稍后再试");
      }
    });
  };

  const ChoosenButtonP: ChooseButtonProps = {
    OnClick_1: () => vote(VOTEResult.A_WINS),
    OnClick_2: () => vote(VOTEResult.B_WINS),
    OnClick_3: () => vote(VOTEResult.DRAW),
    OnClick_4: () => vote(VOTEResult.SKIP),
  }
  const rankRef = useRef<HTMLDivElement>(null);
  const myDataRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <title>Noita天赋投票箱</title>
      <main className="flex-grow flex flex-col justify-center items-center text-center space-y-10 pt-10">
        {error && <Error error={error} onClick={() => { setError(null) }} />}
        <div className="w-full flex justify-center">
          <Notice />
        </div>
        <div className="w-full flex justify-center">
          {currentPair && (
            <RankingVS
              left={currentPair.perkA}
              right={currentPair.perkB}
              ChooseProps={ChoosenButtonP}
              LastVote={lastVote || ""}
            />
          )}
        </div>
        <div ref={myDataRef} className="w-full flex justify-center">
          <MyData />
        </div>
        <div ref={rankRef} className="w-full flex justify-center">
          <Rank rank={rank} onRefresh={GetRank} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PerkPage;