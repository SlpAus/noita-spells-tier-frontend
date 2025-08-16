import Box from "./UI/Box";

const Link = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
        {children}
    </a>
);

export default function Notice() {
    return (
        <Box className="w-full max-w-3xl text-left text-xl p-6 space-y-4">
            <h3 className="text-3xl font-bold text-center">欢迎来到《Noita》法术投票箱！</h3>
            <p>在这里，每次会有一对法术等待你的抉择。</p>
            <ul className="list-disc list-inside pl-4 space-y-1 my-2">
                <li><strong>投票：</strong>点击左右的按钮或法术图标，为你更喜欢的法术投票。</li>
                <li><strong>双输：</strong>点击上方的“还有人类吗？”按钮，判定两个法术都不尽人意。</li>
                <li><strong>跳过：</strong>点击下方的 “你问我？我怎么知道？”按钮，直接跳过本轮。</li>
            </ul>
            <p>投票区域下方，你可以生成一份基于投票历史的个性化报告，也可以查询实时的社区法术排名。</p>
            <p>
                本项目已在 <Link href="https://github.com/SlpAus/noita-spells-tier-frontend">GitHub</Link> 开源。
                如想要反馈Bug，或者与更多Noita玩家交流，欢迎加入 <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=527dJwRmHYHNYync0J4uYvFqKfaB1IiQ&authKey=5jzyNBqfjn5Liki4Vs9aVnfkGb1DgUN5e1LMjJl+cMTMHzCaKZ1hY+GFhQPHfYmX">Noita交流总群</Link> 或前往 <Link href="https://tieba.baidu.com/f?kw=noita">Noita百度贴吧</Link>。
            </p>
        </Box>
    );
}