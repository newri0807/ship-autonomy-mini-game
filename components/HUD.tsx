import React from "react";

interface HUDProps {
    gameState: ReturnType<typeof import("@/hooks/useGameState").default>;
    isShaking: boolean;
}

const HUD: React.FC<HUDProps> = ({gameState, isShaking}) => {
    const getHealthBarColor = (health: number) => {
        if (health <= 30) return "bg-red-500";
        if (health <= 50) return "bg-orange-500";
        return "bg-green-500";
    };

    return (
        <div className={`absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-40 ${isShaking ? "animate-shake" : ""}`}>
            <div className="bg-gray-800 bg-opacity-75 p-1 rounded text-xs">
                <div className="font-bold">Player: {gameState.nickname}</div>
                <div className="font-bold">Score: {gameState.score}</div>
            </div>
            <div className="w-1/3 bg-gray-800 bg-opacity-75 p-1 rounded">
                <div className="text-xs mb-1">Health</div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getHealthBarColor(gameState.health)}`}
                        style={{width: `${gameState.health}%`}}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default HUD;
