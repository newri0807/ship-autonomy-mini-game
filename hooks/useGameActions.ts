import {useCallback} from "react";
import confetti from "canvas-confetti";

export default function useGameActions(gameState: ReturnType<typeof import("./useGameState").default>) {
    const {setGameStarted, setScore, setHealth, setGameOver, setGameSuccess, setAutonomousMode, setObjects, setPlayerPosition} = gameState;

    const startGame = useCallback(() => {
        setGameStarted(true);
        setScore(0);
        setHealth(100);
        setGameOver(false);
        setGameSuccess(false);
        setAutonomousMode(false);
        setObjects([]);
        setPlayerPosition({x: 48.5, y: 50});
    }, [setGameStarted, setScore, setHealth, setGameOver, setGameSuccess, setAutonomousMode, setObjects, setPlayerPosition]);

    const movePlayer = useCallback(
        (direction: "up" | "down" | "left" | "right") => {
            setPlayerPosition((prev) => {
                const newPos = {...prev};
                const moveDistance = 2;
                const maxY = 90;
                switch (direction) {
                    case "up":
                        newPos.y = Math.max(0, prev.y - moveDistance);
                        break;
                    case "down":
                        newPos.y = Math.min(maxY, prev.y + moveDistance);
                        break;
                    case "left":
                        newPos.x = Math.max(0, prev.x - moveDistance);
                        break;
                    case "right":
                        newPos.x = Math.min(100, prev.x + moveDistance);
                        break;
                }
                return newPos;
            });
        },
        [setPlayerPosition]
    );

    const triggerScreenShake = useCallback(() => {
        const gameArea = document.getElementById("gameArea");
        if (gameArea) {
            gameArea.classList.add("shake");
            setTimeout(() => {
                gameArea.classList.remove("shake");
            }, 500);
        }
    }, []);

    const triggerConfetti = useCallback(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6},
        });
    }, []);

    return {startGame, movePlayer, triggerScreenShake, triggerConfetti};
}
