import Box from "./UI/Box"

export default function Attention() {
    return (
        <Box className="space-y-5">
            <p className="text-2xl font-bold animate-slide-fade">
                注意：本投票箱仿照
                <a href="https://vote.ltsc.vip/" className="text-2xl font-bold mx-1 text-blue-700 hover:text-red-600">明日方舟投票箱</a>
                进行设计，同时作为某大二学生的练手项目，存在诸多瑕疵望大家谅解。另外，此项目正处于测试期，数据库是测试用数据，不具有任何意义。
            </p>
            <p className="text-2xl font-bold animate-slide-fade">
                本投票箱仅供娱乐，不具有任何商业用途，如有侵权请联系我删除。同时，本投票箱开源在
                <a href="https://github.com/Qiuarctica/ys-voting-frontend" className="text-2xl font-bold mx-1 text-blue-700 hover:text-red-600">Github</a>
                上，非常希望有志同道合的同学可以加入这个项目，或者是提一些建议!若是想进行交流，或是提出建议，亦或是发现bug，欢迎加入QQ群：903619222。
            </p>
        </Box>
    )
}