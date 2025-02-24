import { useEffect, useRef } from "react";
import movingGif from "../logo.svg";
import "./MovingGif.css";

const MovingGif = () => {
    const gifRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const gif = gifRef.current;
        if (!gif) return;

        let x = 0;
        let y = 0;
        let dx = 2;
        let dy = 2;

        const moveGif = () => {
            const rect = gif.getBoundingClientRect();
            if (rect.right >= window.innerWidth || rect.left <= 0) {
                dx = -dx;
            }
            if (rect.bottom >= window.innerHeight || rect.top <= 0) {
                dy = -dy;
            }
            x += dx;
            y += dy;
            gif.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(moveGif);
        };

        moveGif();
    }, []);

    return (
        <img ref={gifRef} src={movingGif} alt="Moving GIF" className="fixed w-16 h-16" />
    );
}

export default MovingGif;