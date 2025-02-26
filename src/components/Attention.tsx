import Box from "./UI/Box"

export default function Attention() {
    return (
        <Box className="space-y-5">
            <p className="text-2xl font-bold animate-slide-fade">
                注意：本投票箱仿照
                <a href="https://vote.ltsc.vip/" className="text-2xl font-bold mx-1 text-blue-700 hover:text-red-600">明日方舟投票箱</a>
                进行设计，同时作为某大二学生的练手项目，存在诸多瑕疵望大家谅解。
            </p>
            <p className="text-2xl font-bold animate-slide-fade">
                本投票箱仅供娱乐，不具有任何商业用途，如有侵权请联系我删除。同时，本投票箱开源在
                <a href="https://github.com/Qiuarctica/ys-voting-frontend" className="text-2xl font-bold mx-1 text-blue-700 hover:text-red-600">Github</a>
                上，欢迎大家提出建议。
            </p>
        </Box>
    )
}