import RankingVS from "./components/RankingVS";
import { ChooseButtonProps } from "./components/ChooseButton";
import { useState, useEffect, useRef } from "react";
import { GetSpellPair } from "./utils/GetSpellPair";
import { SendVoting } from "./utils/SendVoting";
import { PairedSpell, RankedSpell } from "./types/spell";
import Rank from "./components/Rank";
import { GetRanking } from "./utils/GetRanking";
import Error from "./components/Error";
import { VOTEResult } from "./types/votingResult";
import MyData from "./components/MyData";
import Notice from "./components/Notice";
import Footer from "./components/Footer";
import { GetPairAPIResponse } from "./types/pair";

function App() {
  const [currentPair, setCurrentPair] = useState<GetPairAPIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastVote, setLastVote] = useState<string | null>(null);
  const [rank, setRank] = useState<RankedSpell[]>([]);

  const GetPair = () => {
    GetSpellPair()
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
          setError("无法获取法术对，请稍后再试");
        }
      });
  };

  const GetRank = () => {
    GetRanking()
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
      spellA: currentPair.spellA.id,
      spellB: currentPair.spellB.id,
      result: result,
      pairId: currentPair.pairId,
      signature: currentPair.signature,
    };

    SendVoting(payload).then(() => {
      if (result === VOTEResult.DRAW) {
        setLastVote(`你认为 ${currentPair.spellA.name} (排名: ${currentPair.spellA.rank}) 和 ${currentPair.spellB.name} (排名: ${currentPair.spellB.rank}) 都很糟糕！`);
      } else {
        const winner = result === VOTEResult.A_WINS ? currentPair.spellA : currentPair.spellB;
        const loser = result === VOTEResult.A_WINS ? currentPair.spellB : currentPair.spellA;
        setLastVote(`你选择了 ${winner.name} (排名: ${winner.rank}) 而不是 ${loser.name} (排名: ${loser.rank})`);
      }
      GetPair(); // Fetch a new pair after voting
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
    OnClick_4: () => GetPair(),
  }
  const rankRef = useRef<HTMLDivElement>(null);
  const myDataRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-cover bg-center bg-fixed bg-[url('../public/images/bg.webp')] min-w-[54rem] min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col justify-center items-center text-center space-y-10 pt-10">
        {error && <Error error={error} onClick={() => { setError(null) }} />}
        <div className="w-full flex justify-center">
          <Notice />
        </div>
        <div className="w-full flex justify-center">
          {currentPair && (
            <RankingVS
              left={currentPair.spellA}
              right={currentPair.spellB}
              ChooseProps={ChoosenButtonP}
              LastVote={lastVote || ""}
            />
          )}
        </div>
        <div ref={myDataRef} className="w-full flex justify-center">
          <MyData />
        </div>
        <div ref={rankRef} className="w-full flex justify-center">
          <Rank title="法术排行榜" rank={rank} onRefresh={GetRank} />
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default App;
