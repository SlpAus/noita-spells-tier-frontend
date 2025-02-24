import RankingVS from "./components/RankingVS";
import { ChooseButtonProps } from "./components/ChooseButton";
import { image } from "./types/image";
import Title from "./components/Title";
// import MovingGif from "./components/MovingGif";

function App() {
  const test_image_1 : image = {
    url:"https://p1.itc.cn/q_70/images01/20230830/13db8ed2707c4440945556d4edf20671.jpeg",
    name : "奶龙",
    width : 200,
    height : 200
  }
  const do_nothing = () => {}
  const ChoosenButtonP : ChooseButtonProps = {
    OnClick_1 : do_nothing,
    OnClick_2 : do_nothing,
    OnClick_3 : do_nothing,
  }
  return (
    <div>
      <div className="flex flex-col items-center space-y-10">
        <Title/>
        <RankingVS left={test_image_1} right={test_image_1} ChooseProps={ChoosenButtonP}/>
      </div>
    </div>
  )
}


export default App;
