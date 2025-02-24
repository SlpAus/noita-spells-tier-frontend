// 发送投票结果给后端

// post /api/sendVoting
import axios from "axios";
import { votingResult } from "../types/votingResult";


export async function SendVoting(result : votingResult){
    await axios.post("/api/sendVoting",result);
}
