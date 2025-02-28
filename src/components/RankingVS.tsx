// 用于展示两个道具/角色的图片，中间标注VS

import { image } from '../types/image';
import Image from './UI/Image';
import ChooseButton, { ChooseButtonProps } from "./ChooseButton";
import Title from './Title';
import Box from './UI/Box';

const RankingVS = (props: { left: image, right: image, ChooseProps: ChooseButtonProps, LastVote: string }) => {
    return (
        <Box className="flex flex-col items-center justify-center space-y-6">

            {/* 标题 */}
            <div className="flex flex-col items-center space-y-3">
                <Title />
            </div>

            {/* 中间层：道具VS */}
            <div className='flex items-center justify-center space-x-2'>
                <button onClick={props.ChooseProps.OnClick_1} className="w-1/3">
                    <Image image_prop={props.left} />
                </button>
                <div className="flex flex-col items-center space-y-16 w-1/3">
                    <img src="/images/vs.png"></img>
                    <div className="flex flex-col items-center space-y-6">
                        <p className="text-3xl text-red-500 font-bold text-center">{props.LastVote}</p>
                    </div>
                </div>
                <button onClick={props.ChooseProps.OnClick_2} className='w-1/3'>
                    <Image image_prop={props.right} />
                </button>
            </div>

            {/* 下方层：选择按钮 */}
            <div className="flex items-center justify-center">
                <ChooseButton prop={props.ChooseProps} />
            </div>

        </Box>
    );
}

export default RankingVS;