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
import Filter from "./components/Filter";
import { filter } from "./types/filter";
import Error from "./components/Error";
// import MovingGif from "./components/MovingGif";

function App() {
  const defaultFilter: filter = {
    startQuality: 0,
    endQuality: 4,
    canBeLost: false,
    itemPools: [],
  }
  const [ItemList, setItemList] = useState<item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastVote, setLastVote] = useState<string | null>(null);
  const [rank, setRank] = useState<ranking[]>([]);
  const [filter, setFilter] = useState<filter>(defaultFilter);
  const fn = ItemList.length > 0 ? ItemList[0].filternum : 0;

  const GetTwoItem = (filter_p: filter) => {
    GetItems(2, filter_p)
      .then((res: item[]) => {
        setItemList(res);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError(error.message);
        OnFilterChange(defaultFilter);
      });
  };
  const GetRank = (filter_p: filter) => {
    GetRanking("item", filter_p)
      .then((res: ranking[]) => {
        setRank(res);
      })
      .catch((error) => {
        console.error("Error fetching ranking:", error);
        setError("Failed to fetch ranking.");
        OnFilterChange(defaultFilter);
      });
  };
  const OnFilterChange = (filter_p: filter) => {
    if (filter_p.startQuality > filter_p.endQuality) {
      filter_p.endQuality = filter_p.startQuality;
    }
    setFilter(filter_p);
    GetRank(filter_p);
    GetTwoItem(filter_p);
  };


  useEffect(() => {
    GetTwoItem(defaultFilter);
    GetRank(defaultFilter);
  }, []);

  const vote = async (type: string, winner: number, loser: number, filterNum: number) => {
    const result = await SendVoting({ type, winner, loser, filterNum });
    if (result) {
      const winnerItem = ItemList.find((item) => item.id === winner);
      const loserItem = ItemList.find((item) => item.id === loser);
      setLastVote(`成功投票给${winnerItem?.name}(${rank.find((item) => item.name === winnerItem?.name)?.rank}名)，于此同时${loserItem?.name}(${rank.find((item) => item.name === loserItem?.name)?.rank}名)`);
      GetTwoItem(filter);
    } else {
      setError("Failed to send vote");
      GetTwoItem(filter);
    }
  };
  const ChoosenButtonP: ChooseButtonProps = {
    OnClick_1: () => vote("item", ItemList[0].id, ItemList[1].id, fn),
    OnClick_2: () => vote("item", ItemList[1].id, ItemList[0].id, fn),
    OnClick_3: () => vote("nobody", ItemList[0].id, ItemList[1].id, fn),
    OnClick_4: () => GetTwoItem(filter),
  }
  return (
    <div className="bg-[length:100%] bg-no-repeat bg-[url('../public/images/bg.webp')] min-w-[54rem]  ">
      <div className="flex flex-wrap justify-center items-center text-center space-x-10 space-y-10">
        {error && <Error error={error} onClick={() => { setError(null) }} />}
        {ItemList.length > 0 && (
          <RankingVS
            left={{
              url: ItemList[0].url,
              name: ItemList[0].name,
              description: ItemList[0].description,
              width: 200,
              height: 300,
            }}
            right={{
              url: ItemList[1].url,
              name: ItemList[1].name,
              description: ItemList[1].description,
              width: 200,
              height: 300,
            }}
            ChooseProps={ChoosenButtonP}
            LastVote={lastVote || ""}
          />
        )}
        <Filter Filter={filter} setFilter={setFilter} onFilterChange={OnFilterChange} filterNum={fn} />
        <Rule />
        <Attention />
        <Rank title="道具排行榜" rank={rank} onRefresh={() => {
          GetRank(filter);
        }} />
        {/* <Stuff /> */}
      </div>
    </div>


  );
}


export default App;
