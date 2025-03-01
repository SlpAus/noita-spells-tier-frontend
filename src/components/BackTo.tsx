export interface BackToProps {
    to: string;
    toClick: () => void;
}

export default function BackTo(props: { backs: BackToProps[] }) {
    return (
        <div className="flex justify-center items-center flex-col space-y-2">
            {props.backs.map((back, index) => (
                <button key={index} onClick={back.toClick} className="bg-blue-200 p-2 rounded-lg w-full">
                    {back.to}
                </button>
            ))}
        </div>
    );
}