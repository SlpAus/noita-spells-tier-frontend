import Box from "./UI/Box"

export default function Rule() {
    return (
        <Box>
            <p className="text-2xl font-bold">规则：请你在出现的道具中，结合自己的经验选择你最可能选择的道具，每次投票，得票者+1分，未得票者-1分，最后统计所有道具/角色的胜率和得分，以胜率排名</p>
        </Box>
    )
}