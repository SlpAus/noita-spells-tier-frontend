// 选择按钮，用于做出选择

export interface ChooseButtonProps {
    OnClick_1: () => void,//左赢
    OnClick_2: () => void,//右赢
    OnClick_3: () => void,//都输
    OnClick_4: () => void,//无事发生
}

const ChooseButton = (props: { prop: ChooseButtonProps }) => {

    return (
        <div className="flex flex-3 items-center space-x-10">
            <button
                onClick={props.prop.OnClick_1}
                className="group bg-red-400 px-4 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-blue-400 hover:text-white transition-all duration-300">
                <div className=" flex items-center space-x-2 justify-center">
                    <img src="/images/md.png" alt="111" className="-rotate-90 group-hover:rotate-0 transition-all duration-300"></img>
                    <p className="text-xl">我寻思左边能行</p>
                </div>
            </button>
            <div className="flex flex-col space-y-3">
                <button
                    onClick={props.prop.OnClick_3}
                    className="group bg-orange-700 text-white px-1 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-400 hover:text-black transition-all duration-300">
                    <div className=" flex items-center space-x-2 justify-center">
                        <img src="/images/db.png" alt="111" className="group-hover:scale-[400%] transition-all duration-300"></img>
                        <p className="text-base">还有人类吗？</p>
                    </div>
                </button>
                <button
                    onClick={props.prop.OnClick_4}
                    className="group bg-green-600 px-1 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-yellow-400 hover:text-white transition-all duration-300">
                    <div className=" flex items-center space-x-1 justify-center">
                        <img src="/images/wl.png" alt="111" className="group-hover:rotate-180 transition-all duration-300"></img>
                        <p className="text-base">你问我？我怎么知道？</p>
                    </div>
                </button>


            </div>
            <button
                onClick={props.prop.OnClick_2}
                className="group bg-blue-400 px-4 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-red-400 hover:text-white transition-all duration-300">
                <div className=" flex items-center space-x-2 justify-center">
                    <img src="/images/lhh.png" alt="111" className="rotate-90 group-hover:rotate-0 transition-all duration-300"></img>
                    <p className="text-xl">显然是右边厉害</p>
                </div>
            </button>
        </div>
    );

}

export default ChooseButton;
