"use client";

import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

const GameStartScreen = () => {
    const [nickname, setNickname] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showGo, setShowGo] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedNickname = localStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        }

        const handleBeforeUnload = () => {
            localStorage.clear();
            setNickname("");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nickname.trim()) {
            setIsLoading(true);
            localStorage.setItem("nickname", nickname);

            setTimeout(() => {
                setIsLoading(false);
                setShowGo(true);

                setTimeout(() => {
                    router.push("/game");
                }, 1000);
            }, 2000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-700">
                <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">Ship Autonomy Game</h1>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Enter your nickname"
                    className="w-full p-3 mb-6 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                    disabled={isLoading || showGo}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-gray-500"
                    disabled={isLoading || showGo}
                >
                    {isLoading ? "Loading..." : showGo ? "Go!" : "Start Game"}
                </button>
            </form>
        </div>
    );
};

export default GameStartScreen;
