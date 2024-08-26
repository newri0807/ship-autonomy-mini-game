"use client";

import ControlPanel from "@/components/ControlPanel";
import OceanBackground from "@/components/OceanBackground";
import {GameObject, PlayerPosition} from "@/hooks/types";
import useGameActions from "@/hooks/useGameActions";
import useGameEffects from "@/hooks/useGameEffects";
import useGameState from "@/hooks/useGameState";
import React, {useCallback, useState} from "react";
import {FaTrophy, FaSadTear} from "react-icons/fa";
import HUD from "@/components/HUD";
import {FaShip} from "react-icons/fa";


// 게임 종료 화면을 표시하는 컴포넌트
const GameOver: React.FC<{gameSuccess: boolean; score: number; startGame: () => void}> = ({gameSuccess, score, startGame}) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 rounded-lg shadow-md text-center text-white w-[300px] p-10">
            <div className="flex justify-center mb-4">
                {gameSuccess ? <FaTrophy className="text-yellow-400 text-6xl" /> : <FaSadTear className="text-blue-400 text-6xl" />}
            </div>
            <h1 className="text-2xl font-bold mb-2">{gameSuccess ? "Congratulations!" : "Game Over"}</h1>
            <p className="mb-2">Your score: {score}</p>
            <button onClick={startGame} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm mt-3">
                Play Again
            </button>
        </div>
    </div>
);

// 게임 오브젝트(아이템, 장애물)와 플레이어를 렌더링하는 컴포넌트
const GameObjects: React.FC<{objects: GameObject[]; playerPosition: PlayerPosition}> = ({objects, playerPosition}) => (
    <>
        {objects.map((obj) => (
            <div
                key={obj.id}
                className={`absolute w-8 h-8 flex items-center justify-center text-xl ${
                    obj.type === "obstacle" ? "bg-red-500" : "bg-yellow-100"
                } rounded-full z-40`}
                style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                    transition: "all 0.1s linear",
                }}
            >
                {obj.type === "obstacle" ? "💣" : "🎁"}
            </div>
        ))}

        <FaShip
            className="absolute text-white transition-all duration-100 z-50 text-6xl shadow-lg"
            style={{
                left: `${playerPosition.x}%`,
                top: `${playerPosition.y}%`,
                transition: "all 0.1s linear",
            }}
        />
    </>
);

export default function Game() {
    // 게임 상태 관리 훅
    const gameState = useGameState();
    const {gameOver, gameSuccess, score, autonomousMode, objects, playerPosition} = gameState;
    // 게임 액션 관리 훅
    const {startGame, movePlayer, triggerScreenShake, triggerConfetti} = useGameActions(gameState);
    // 화면 흔들림 효과를 위한 상태
    const [isShaking, setIsShaking] = useState(false);

    // 자율 주행 모드 로직
    const autonomousNavigation = useCallback(() => {
        const safeDistance = 15;
        const nearestObstacle = objects.find((obj) => obj.type === "obstacle");
        const nearestItem = objects.find((obj) => obj.type === "item");

        if (nearestObstacle) {
            const distanceX = nearestObstacle.x - playerPosition.x;
            const distanceY = nearestObstacle.y - playerPosition.y;

            if (Math.abs(distanceX) < safeDistance && Math.abs(distanceY) < safeDistance) {
                if (Math.abs(distanceX) > Math.abs(distanceY)) {
                    movePlayer(distanceX > 0 ? "left" : "right");
                } else {
                    movePlayer(distanceY > 0 ? "up" : "down");
                }
                return;
            }
        }

        if (nearestItem) {
            if (Math.abs(nearestItem.x - playerPosition.x) > 2) {
                movePlayer(nearestItem.x < playerPosition.x ? "left" : "right");
            } else if (nearestItem.y > playerPosition.y) {
                movePlayer("down");
            }
        }
    }, [objects, playerPosition, movePlayer]);

    // 게임 루프 함수
    const gameLoop = useCallback(() => {
        if (!gameState.gameStarted || gameState.gameOver) return;

        // 플레이어 위치 업데이트
        gameState.setPlayerPosition((prev) => {
            let newX = prev.x;
            let newY = prev.y;
            const moveSpeed = 1;
            const maxY = 90;

            if (!gameState.autonomousMode) {
                if (gameState.keyPressed.has("ArrowLeft")) newX = Math.max(0, prev.x - moveSpeed);
                if (gameState.keyPressed.has("ArrowRight")) newX = Math.min(100, prev.x + moveSpeed);
                if (gameState.keyPressed.has("ArrowUp")) newY = Math.max(0, prev.y - moveSpeed);
                if (gameState.keyPressed.has("ArrowDown")) newY = Math.min(maxY, prev.y + moveSpeed);
            }

            return {x: newX, y: newY};
        });

        // 게임 오브젝트 업데이트 및 생성
        gameState.setObjects((prev) => {
            const newObjects = prev
                .map((obj) => ({
                    ...obj,
                    y: obj.y + 1,
                }))
                .filter((obj) => obj.y < 100);

            if (Math.random() < 0.03) {
                const type = Math.random() < 0.7 ? "obstacle" : "item";
                newObjects.push({
                    id: Date.now(),
                    x: Math.random() * 100,
                    y: 0,
                    type,
                });
            }

            return newObjects;
        });

        // 충돌 감지 및 점수/체력 업데이트
        gameState.objects.forEach((obj) => {
            if (Math.abs(obj.x - gameState.playerPosition.x) < 5 && Math.abs(obj.y - gameState.playerPosition.y) < 5) {
                if (obj.type === "item") {
                    triggerConfetti();
                    gameState.setScore((prev) => {
                        const newScore = prev + 10;
                        localStorage.setItem("score", newScore.toString());
                        if (newScore >= 100) {
                            gameState.setGameSuccess(true);
                            gameState.setGameOver(true);
                        }
                        return newScore;
                    });
                } else if (!gameState.autonomousMode) {
                    triggerScreenShake();
                    setIsShaking(true);
                    setTimeout(() => setIsShaking(false), 2000);
                    gameState.setHealth((prev) => {
                        const newHealth = prev - 10;
                        if (newHealth <= 0) {
                            gameState.setGameOver(true);
                        }
                        return newHealth;
                    });
                }
                gameState.setObjects((prev) => prev.filter((o) => o.id !== obj.id));
            }
        });

        // 자율 주행 모드 활성화
        if (gameState.autonomousMode) {
            autonomousNavigation();
        }

        // 자율 주행 모드 전환 (점수가 50점 이상일 때)
        if (gameState.score >= 50 && !gameState.autonomousMode) {
            gameState.setAutonomousMode(true);
            setTimeout(() => gameState.setAutonomousMode(false), 20000);
        }
    }, [gameState, autonomousNavigation, triggerConfetti, triggerScreenShake]);

    // 게임 효과 (키보드 이벤트 리스너 등) 관리 훅
    const {gameAreaRef} = useGameEffects(gameState, gameLoop);

    // 게임 오버 시 GameOver 컴포넌트 렌더링
    if (gameOver) {
        return <GameOver gameSuccess={gameSuccess} score={score} startGame={startGame} />;
    }

    return (
        <div id="gameArea" ref={gameAreaRef} className="h-screen w-full overflow-hidden bg-gray-900 text-white relative">
            {/* 게임 배경 및 오브젝트 렌더링 */}
            <div className="absolute inset-0 flex flex-col h-[76vh]">
                <OceanBackground>
                    <GameObjects objects={objects} playerPosition={playerPosition} />
                </OceanBackground>

                <div className="h-1/5 bg-blue-600"></div>
            </div>

            {/* 컨트롤 패널 및 HUD */}
            <>
                <ControlPanel isShaking={isShaking} />
                <HUD gameState={gameState} isShaking={isShaking} />
            </>

            {/* 자율 주행 모드 오버레이 */}
            {autonomousMode && (
                <div className="absolute inset-0 bg-yellow-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="text-center text-black">
                        <h2 className="text-xl font-bold">Autonomous Mode Activated</h2>
                        <p className="text-base mt-2">Sit back and watch!</p>
                    </div>
                </div>
            )}

            {/* 게임 시작 화면 */}
            {!gameState.gameStarted && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="text-center">
                        <p className="mb-4 text-sm">Use arrow keys to navigate: ↑ ↓ ← →</p>
                        <button onClick={startGame} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm">
                            Start Game
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
