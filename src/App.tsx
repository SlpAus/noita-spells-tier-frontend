import RankingVS from "./components/RankingVS";
import { ChooseButtonProps } from "./components/ChooseButton";
import { image } from "./types/image";
import Title from "./components/Title";
import { useState , useEffect } from "react";
import { GetItems } from "./utils/GetItems";
import { SendVoting } from "./utils/SendVoting";
import { item } from "./types/item";
// import MovingGif from "./components/MovingGif";

function App() {
  const [imageList, setImageList] = useState<image[]>([]);
  // const [lastVoting, setLastVoting] = useState<string | null>(null);

  const GetTwoItem = () =>{
    GetItems(2).then((res:item[]) => {
      setImageList(res.map((Item:item) =>{
        const img : image = {
          id: Item.id,
          url: Item.url?Item.url:"",
          name: Item.name
        }
        return img;
      }))
    })
  }

  useEffect(() => {
    GetTwoItem();
  }, []);

  const ChooseLeft = () => {
    SendVoting({
      type: "item",
      winner: imageList[0].id?imageList[0].id:0,
      loser: imageList[1].id?imageList[1].id:0
    })
    GetTwoItem();
  }
  const ChooseRight = () => {
    SendVoting({
      type: "item",
      winner: imageList[1].id?imageList[1].id:0,
      loser: imageList[0].id?imageList[0].id:0
    })
    GetTwoItem();
  }
  const ChooseNothing = () =>{
    GetTwoItem();
  }
  const ChoosenButtonP : ChooseButtonProps = {
    OnClick_1: ChooseLeft,
    OnClick_2: ChooseRight,
    OnClick_3: ChooseNothing
  }
  return (
    <div>
      <div className="flex flex-col items-center space-y-10">
        <Title/>
        <RankingVS left={imageList[0]} right={imageList[1]} ChooseProps={ChoosenButtonP}/>
      </div>
    </div>
  )
}


export default App;
