// 用于展示两个道具/角色的图片，中间标注VS

import { image } from '../types/image';
import Image from './UI/Image';
import ChooseButton, { ChooseButtonProps } from "./ChooseButton";
import Title from './Title';

const RankingVS = (props: { left: image, right: image, ChooseProps: ChooseButtonProps, LastVote: string }) => {
    return (
        <div className="flex bg-gray-50 bg-opacity-95 items-center w-[46rem] justify-center space-x-10 py-8 px-10 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
            <button onClick={props.ChooseProps.OnClick_1}>
                <Image image_prop={props.left} />
            </button>
            <div className="flex flex-col items-center space-y-16 w-[16rem]">
                <Title />
                <p className="text-6xl font-extrabold mt-5 pt-10">VS</p>
                <div className="flex flex-col items-center space-y-6">
                    <p className="text-3xl text-red-600 font-bold text-center">{props.LastVote}</p>
                    <ChooseButton prop={props.ChooseProps} />
                </div>
            </div>
            <button onClick={props.ChooseProps.OnClick_2}>
                <Image image_prop={props.right} />
            </button>
        </div>
    );
}

export default RankingVS;