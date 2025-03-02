import Box from "./UI/Box";

export default function Error(props: { error: string, onClick: () => void }) {
    const { error, onClick } = props;
    return (
        <Box className="bg-red-800 bg-opacity-100 space-y-3">
            <button className="text-white text-xl"
                onClick={onClick}>
                {error}       （点击以关闭错误提示）
            </button>
        </Box>

    );
}