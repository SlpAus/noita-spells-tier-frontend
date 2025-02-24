// 用于展示两个道具/角色的图片，中间标注VS

import { image } from "../types/image";
import Image from './UI/Image';
import ChooseButton , {ChooseButtonProps} from "./ChooseButton";

const RankingVS = (props: { left: image, right: image , ChooseProps : ChooseButtonProps  }) => {
    return (
        <div className="flex items-center max-w-max justify-center space-x-8 py-4 px-10 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
            <Image image_prop={props.left} />
            <div className="flex flex-col items-center space-y-10">
                <p className="text-6xl font-extrabold">VS</p>
                <ChooseButton prop={props.ChooseProps} />
            </div>
            <Image image_prop={props.right} />
        </div>
    );
}

export default RankingVS;