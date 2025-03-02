import RankingVS from "./components/RankingVS";
import { ChooseButtonProps } from "./components/ChooseButton";
import { useState, useEffect, useRef } from "react";
import { GetItems } from "./utils/GetItems";
import { SendVoting } from "./utils/SendVoting";
import { item } from "./types/item";
import Rule from "./components/Rule";
import Attention from "./components/Attention";
import Rank from "./components/Rank";
import { itemRank, ranking } from "./types/ranking";
import { GetRanking } from "./utils/GetRanking";
import Filter from "./components/Filter";
import { filter } from "./types/filter";
import Error from "./components/Error";
import { GetItemRank } from "./utils/GetItemRank";
import ItemRank from "./components/ItemRank";
import BackTo, { BackToProps } from "./components/BackTo";
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 单独某个道具的排行榜
  const [selectRankItem, setSelectRankItem] = useState<item>();
  const [selectRank, setSelectRank] = useState<itemRank[]>();

  const [allItems, setAllItems] = useState<item[]>([]);
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

  const GetItmRank = (item: item, filter_p: filter) => {
    GetItemRank(item.id, filter_p)
      .then((res: itemRank[]) => {
        setSelectRank(res);
      }
      )
      .catch((error) => {
        console.error("Error fetching ranking:", error);
        setError("Failed to fetch ranking.");
        if (error.message === "No ranking data") {
          OnFilterChange(defaultFilter);
        }
      }
      );
  }

  const GetAllItems = () => {
    GetItems(0, defaultFilter)
      .then((res: item[]) => {
        setAllItems(res);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError(error.message);
      });
  }

  const OnSelectItemChange = (item: item | undefined) => {
    setSelectRankItem(item);
    if (item)
      GetItmRank(item, filter);
  }

  const OnFilterChange = (filter_p: filter) => {
    if (filter_p.startQuality > filter_p.endQuality) {
      filter_p.endQuality = filter_p.startQuality;
    }
    setFilter(filter_p);
    GetRank(filter_p);
    GetTwoItem(filter_p);
    if (selectRankItem) {
      GetItmRank(selectRankItem, filter_p);
    }
  };


  useEffect(() => {
    GetTwoItem(defaultFilter);
    GetRank(defaultFilter);
    GetAllItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const vote = async (type: string, winner: number, loser: number, filterNum: number) => {
    const result = await SendVoting({ type, winner, loser, filterNum });
    if (result) {
      const winnerItem = ItemList.find((item) => item.id === winner);
      const loserItem = ItemList.find((item) => item.id === loser);
      if (type == "nobody") {
        setLastVote(`哈哈，${winnerItem?.name}(${rank.find((item) => item.name === winnerItem?.name)?.rank}名)，${loserItem?.name}(${rank.find((item) => item.name === loserItem?.name)?.rank}名)没一个是人`);
      } else {
        setLastVote(`成功投票给${winnerItem?.name}(${rank.find((item) => item.name === winnerItem?.name)?.rank}名)，于此同时${loserItem?.name}(${rank.find((item) => item.name === loserItem?.name)?.rank}名)`);
      }
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
  const filterRef = useRef<HTMLDivElement>(null);
  const itemRankRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const attentionRef = useRef<HTMLDivElement>(null);
  const rankRef = useRef<HTMLDivElement>(null);
  const scrollToComponent = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const basebackList: BackToProps[] = [
    { to: "筛选", toClick: () => scrollToComponent(filterRef) },
    { to: "对位榜单", toClick: () => scrollToComponent(itemRankRef) },
    { to: "道具排行榜", toClick: () => scrollToComponent(rankRef) },
  ];

  const backLists = !showBackToTop ? basebackList : [
    { to: "回到顶部", toClick: () => { window.scrollTo({ top: 0, behavior: 'smooth' }) } },
    ...basebackList
  ];

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
        <div ref={filterRef}>
          <Filter Filter={filter} setFilter={setFilter} onFilterChange={OnFilterChange} filterNum={fn} />
        </div>
        <div ref={itemRankRef}>
          <ItemRank onSelectRankItemChange={OnSelectItemChange} selectRank={selectRank || []} allItems={allItems} selectRankItem={selectRankItem} />
        </div>
        <div ref={ruleRef}>
          <Rule />
        </div>
        <div ref={attentionRef}>
          <Attention />
        </div>
        <div ref={rankRef}>
          <Rank title="道具排行榜" rank={rank} onRefresh={() => {
            GetRank(filter);
          }} />
        </div>
        {/* <Stuff /> */}
      </div>
      <div className="fixed top-3/4 right-0 transform -translate-y-1/2">
        <BackTo backs={backLists} />
      </div>
    </div>
  );
}


export default App;
