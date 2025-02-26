import RankingVS from "./components/RankingVS";
import { ChooseButtonProps } from "./components/ChooseButton";
import { useState, useEffect } from "react";
import { GetItems } from "./utils/GetItems";
import { SendVoting } from "./utils/SendVoting";
import { item } from "./types/item";
import Rule from "./components/Rule";
import Attention from "./components/Attention";
import Rank from "./components/Rank";
import { ranking } from "./types/ranking";
import { GetRanking } from "./utils/GetRanking";
// import MovingGif from "./components/MovingGif";

function App() {
  const [ItemList, setItemList] = useState<item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastVote, setLastVote] = useState<string | null>(null);
  const [rank, setRank] = useState<ranking[]>([]);

  const GetTwoItem = () => {
    setError(null);
    GetItems(2)
      .then((res: item[]) => {
        setItemList(res);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError("Failed to fetch items.");
      });
  };

  const GetRank = () => {
    GetRanking("item")
      .then((res: ranking[]) => {
        setRank(res);
      })
      .catch((error) => {
        console.error("Error fetching ranking:", error);
        setError("Failed to fetch ranking.");
      });
  };

  useEffect(() => {
    GetTwoItem();
    GetRank();
  }, []);

  const vote = async (type: string, winner: number, loser: number) => {
    const result = await SendVoting({ type, winner, loser });
    if (result) {
      setLastVote(`成功投票给 ${ItemList.find((item) => item.id === winner)?.name}`);
      GetTwoItem();
    } else {
      setError("Failed to send vote");
      GetTwoItem();
    }
  };
  const ChoosenButtonP: ChooseButtonProps = {
    OnClick_1: () => vote("item", ItemList[0].id, ItemList[1].id),
    OnClick_2: () => vote("item", ItemList[1].id, ItemList[0].id),
    OnClick_3: () => GetTwoItem(),
  }
  return (
    <div>
      <div className="bg-transparent bg-fixed bg-[url('../public/Collectibles_sprite.png')] min-h-screen flex flex-col items-center space-y-10 p-4">
        {error && <div className="text-red-500">{error}</div>}
        {ItemList.length > 0 && (
          <RankingVS
            left={{
              url: ItemList[0].url,
              name: ItemList[0].name,
              width: 200,
              height: 300,
            }}
            right={{
              url: ItemList[1].url,
              name: ItemList[1].name,
              width: 200,
              height: 300,
            }}
            ChooseProps={ChoosenButtonP}
            LastVote={lastVote || ""}
          />
        )}
        <Rule />
        <Attention />
        <Rank title="道具排行榜" rank={rank} onRefresh={() => {
          GetRank();
        }} />
      </div>
    </div>

  );
}


export default App;
