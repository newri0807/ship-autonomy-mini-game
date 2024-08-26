import {useState} from "react";
import {GameObject, PlayerPosition} from "./types";

export default function useGameState() {
    const [nickname, setNickname] = useState("");
    const [score, setScore] = useState(0);
    const [health, setHealth] = useState(100);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameSuccess, setGameSuccess] = useState(false);
    const [autonomousMode, setAutonomousMode] = useState(false);
    const [objects, setObjects] = useState<GameObject[]>([]);
    const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({x: 48.5, y: 50});
    const [keyPressed, setKeyPressed] = useState<Set<string>>(new Set());

    return {
        nickname,
        setNickname,
        score,
        setScore,
        health,
        setHealth,
        gameStarted,
        setGameStarted,
        gameOver,
        setGameOver,
        gameSuccess,
        setGameSuccess,
        autonomousMode,
        setAutonomousMode,
        objects,
        setObjects,
        playerPosition,
        setPlayerPosition,
        keyPressed,
        setKeyPressed,
    };
}
