import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

export default function useGameEffects(gameState: ReturnType<typeof import("./useGameState").default>, gameLoop: () => void) {
    const {gameStarted, gameOver, autonomousMode, setKeyPressed, setNickname} = gameState;
    const router = useRouter();
    const gameLoopRef = useRef<number | null>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedNickname = localStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        } else {
            router.push("/");
        }
    }, [router, setNickname]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            document.body.style.pointerEvents = "none";
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
            document.body.style.pointerEvents = "auto";
        };
    }, [gameStarted, gameOver, gameLoop]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameStarted && !gameOver && !autonomousMode) {
                setKeyPressed((prev) => new Set(prev).add(e.key));
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setKeyPressed((prev) => {
                const newSet = new Set(prev);
                newSet.delete(e.key);
                return newSet;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameStarted, gameOver, autonomousMode, setKeyPressed]);

    return {gameAreaRef};
}
