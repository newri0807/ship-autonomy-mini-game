import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            keyframes: {
                wave: {
                    "0%": {transform: "translateX(0)"},
                    "100%": {transform: "translateX(-50%)"},
                },
                shake: {
                    "0%, 100%": {transform: "translateX(0)"},
                    "25%": {transform: "translateX(5px)"},
                    "50%": {transform: "translateX(-5px)"},
                    "75%": {transform: "translateX(5px)"},
                },
            },
            animation: {
                wave: "wave 10s linear infinite",
                shake: "shake 0.5s ease-in-out infinite",
            },
        },
    },
    plugins: [
        plugin(function ({addUtilities}) {
            addUtilities({
                ".wave-container": {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    overflow: "hidden",
                    "line-height": "0",
                },
                ".wave": {
                    position: "relative",
                    width: "200%",
                    height: "100px",
                    "background-repeat": "repeat-x",
                },
                ".wave1": {
                    "z-index": "4",
                    opacity: "1",
                },
                ".wave2": {
                    top: "-70px",
                    "z-index": "3",
                    opacity: "0.8",
                },
                ".wave3": {
                    top: "-140px",
                    "z-index": "2",
                    opacity: "0.6",
                },
            });
        }),
    ],
};

export default config;
