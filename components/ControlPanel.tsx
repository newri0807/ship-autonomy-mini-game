import React, {useState, useEffect} from "react";
import {FaTachometerAlt, FaWater, FaExclamationTriangle} from "react-icons/fa";
import {GiShipWheel} from "react-icons/gi";

interface ControlPanelProps {
    isShaking: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({isShaking}) => {
    const [speed, setSpeed] = useState(0);
    const [fuel, setFuel] = useState(100);
    const [depth, setDepth] = useState(50);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed((prev) => (prev + Math.random() * 5) % 100);
            setFuel((prev) => Math.max(0, prev - 0.5));
            setDepth((prev) => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
            setWarning((prev) => !prev);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const wheelStyle = {
        animation: "oscillate 4s ease-in-out infinite",
    };

    return (
        <div
            className={`absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-3xl p-4 z-30 shadow-lg transform perspective-1000 rotateX-5 ${
                isShaking ? "animate-shake" : ""
            }`}
        >
            <style>
                {`
          @keyframes oscillate {
            0% { transform: rotate(-90deg); }
            50% { transform: rotate(90deg); }
            100% { transform: rotate(-90deg); }
          }
        `}
            </style>
            <div className="grid grid-cols-3 gap-4 h-full">
                {/* Left Panel */}
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 flex flex-col justify-between shadow-inner transform -rotate-1">
                    <div className="text-blue-400 text-lg font-bold mb-2">Navigation</div>
                    <div className="flex-grow flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                            <FaTachometerAlt className="text-green-400 text-2xl" />
                            <div className="text-white text-xl font-bold">{speed.toFixed(0)} knots</div>
                        </div>
                        <div className="w-full bg-gray-600 h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{width: `${speed}%`}}></div>
                        </div>
                    </div>
                </div>

                {/* Center Panel with Oscillating Wheel */}
                <div className="bg-gradient-to-b -mt-1 h-[330px] from-gray-700 to-gray-800 rounded-lg p-3 flex flex-col justify-between items-center shadow-inner">
                    <div className="text-yellow-400 text-lg font-bold mb-2">Ship Control</div>
                    <div className="flex-grow flex items-center justify-center">
                        <GiShipWheel className="text-blue-400 text-8xl" style={wheelStyle} />
                    </div>
                    <div className="w-full">
                        <div className="w-full bg-gray-600 h-2 rounded-full mb-1">
                            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{width: `${fuel}%`}}></div>
                        </div>
                        <div className="text-white text-sm">Fuel: {fuel.toFixed(1)}%</div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="bg-gradient-to-bl from-gray-700 to-gray-800 rounded-lg p-3 flex flex-col justify-between shadow-inner transform rotate-1">
                    <div className="text-red-400 text-lg font-bold mb-2">Depth Control</div>
                    <div className="flex-grow flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                            <FaWater className="text-blue-400 text-2xl" />
                            <div className="text-white text-xl font-bold">{depth.toFixed(1)} m</div>
                        </div>
                        <div className="w-full bg-gray-600 h-2 rounded-full mb-2">
                            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{width: `${depth}%`}}></div>
                        </div>
                        <FaExclamationTriangle
                            className={`text-2xl ${warning ? "text-yellow-400" : "text-gray-600"} transition-colors duration-300 mx-auto`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
