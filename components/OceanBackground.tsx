import React from "react";

interface OceanBackgroundProps {
    children?: React.ReactNode;
}

const OceanBackground: React.FC<OceanBackgroundProps> = ({children}) => {
    return (
        <div className="flex-grow bg-gradient-to-b from-sky-400 to-blue-500 relative overflow-hidden">         
            <div className="wave-container">
                <div className="wave wave1 animate-wave">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,120 L0,120 Z" fill="#1E40AF" />
                    </svg>
                </div>
                <div className="wave wave2 animate-wave">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,120 L0,120 Z" fill="#2563EB" />
                    </svg>
                </div>
                <div className="wave wave3 animate-wave">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,40 C240,40 480,40 720,40 C960,40 1200,40 1440,40 L1440,120 L0,120 Z" fill="#3B82F6" />
                    </svg>
                </div>
            </div>
            {children}
        </div>
    );
};

export default OceanBackground;
