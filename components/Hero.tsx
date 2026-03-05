"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    Star,
    Gauge,
    Monitor,
    Maximize,
    TrendingUp,
    ArrowRight,
    PlayCircle,
    Smartphone,
    Activity
} from "lucide-react";

const SPECS = [
    {
        id: "speed",
        label: "20 km/h",
        sub: "max",
        icon: <Gauge size={24} />,
    },
    {
        id: "screen",
        label: '21.5"',
        sub: "w/BT",
        icon: <Monitor size={24} />,
    },
    {
        id: "surface",
        label: "Large",
        sub: "Running Surface",
        icon: <Maximize size={24} />,
    },
    {
        id: "incline",
        label: "15",
        sub: "Incline Levels",
        icon: <TrendingUp size={24} />,
    },
];

const MODELS = [
    { id: "pro", label: "sTread Pro" },
    { id: "row", label: "sRow" },
    { id: "bike", label: "sBike" },
    { id: "gym-pro", label: "sGym Pro" },
];

interface VideoPlayerProps {
    src: string;
    isActive: boolean;
    onEnded?: () => void;
    className?: string;
}

function VideoPlayer({ src, isActive, onEnded, className = "" }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [src, isActive]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={`w-full h-full object-contain drop-shadow-2xl ${className}`}
            muted
            playsInline
            loop
            onEnded={onEnded}
        />
    );
}

export function Hero() {
    const [activeModel, setActiveModel] = useState("pro");

    const handleNext = useCallback(() => {
        setActiveModel((current) => {
            const currentIndex = MODELS.findIndex((m) => m.id === current);
            const nextIndex = (currentIndex + 1) % MODELS.length;
            return MODELS[nextIndex].id;
        });
    }, []);

    const handlePrev = useCallback(() => {
        setActiveModel((current) => {
            const currentIndex = MODELS.findIndex((m) => m.id === current);
            const prevIndex = (currentIndex - 1 + MODELS.length) % MODELS.length;
            return MODELS[prevIndex].id;
        });
    }, []);

    // Auto-slider logic
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [activeModel, handleNext]);

    return (
        <section className="relative w-full h-full bg-[#E0E7FF] overflow-hidden flex flex-col items-center pt-3">

            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Discover Our Treadmills Specific Model
            </h1>

            {/* Model Selector Tabs */}
            <div className="flex items-center h-[6vh] bg-[#d5dbe9]/40 backdrop-blur-md rounded-full border border-white/20">
                {MODELS.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => setActiveModel(model.id)}
                        className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeModel === model.id
                            ? "bg-[#D6E0FF] text-gray-900 border border-[#2b59c3] shadow-sm"
                            : "text-gray-600 hover:text-gray-900 border border-transparent"
                            }`}
                    >
                        {model.label}
                    </button>
                ))}
            </div>
            {/* Main Content Area */}
            <div className="flex-1 w-full relative flex items-center justify-center">

                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between w-full max-w-6xl mx-auto px-4 pointer-events-none z-10">
                    <button
                        onClick={handlePrev}
                        className="pointer-events-auto text-gray-700 hover:text-black hover:scale-110 transition-transform hidden sm:block"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="pointer-events-auto text-gray-700 hover:text-black hover:scale-110 transition-transform hidden sm:block"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>


                {/* Product Image */}
                <div className="relative h-[60vh] w-full min-h-0 overflow-hidden">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
                        style={{ transform: `translateX(-${MODELS.findIndex(m => m.id === activeModel) * 100}%)` }}
                    >
                        {MODELS.map((model) => (
                            <div key={model.id} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                                {model.id === "pro" && (
                                    <VideoPlayer
                                        src="https://s3.us-east-1.amazonaws.com/sportstech.team/videos/sTread_Shadow.webm"
                                        className="scale-125 -translate-y-4"
                                        isActive={activeModel === model.id}
                                    />
                                )}
                                {model.id === "row" && (
                                    <VideoPlayer
                                        src="https://s3.us-east-1.amazonaws.com/sportstech.team/videos/sRow_UIUX_Animation.webm"
                                        className="scale-140 -translate-y-20 md:-translate-y-32 xl:-translate-y-25"
                                        isActive={activeModel === model.id}
                                    />
                                )}
                                {model.id === "bike" && (
                                    <VideoPlayer
                                        src="https://s3.us-east-1.amazonaws.com/sportstech.team/videos/sBike_UIUX_Animation.webm"
                                        className="scale-125 -translate-y-4 md:scale-100 md:-translate-y-6"
                                        isActive={activeModel === model.id}
                                    />
                                )}
                                {model.id === "gym-pro" && (
                                    <VideoPlayer
                                        src="/videos/gym-pro.webm"
                                        className="scale-100 -translate-y-6"
                                        isActive={activeModel === model.id}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar - Flex Flow at Bottom */}
            <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center justify-between px-8 z-20 gap-4 mb-6 mt-auto">


                {/* Left: Rating & Name */}
                <div className="flex flex-col items-center xl:items-start min-w-[200px]">
                    <div className="flex items-center text-yellow-400">
                        <div className="flex gap-0.5">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" className="text-gray-400/50" />
                        </div>
                        <span className="text-gray-900 font-bold text-sm mt-0.5">670</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{MODELS.find(m => m.id === activeModel)?.label}</h2>
                </div>

                {/* Center: Specs Bar */}
                <div className="flex-1 w-full lg:w-auto overflow-x-auto no-scrollbar flex justify-center">
                    <div className="flex items-center justify-center px-6 py-2 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm border border-white/60">

                        {activeModel === "gym-pro" ? (
                            // sGym Pro Specs
                            <div className="flex items-center justify-between gap-4 md:gap-8 min-w-max px-4">
                                {/* Screen Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <span className="text-3xl font-black text-gray-900 leading-none tracking-tight">21.5"</span>
                                        <div className="flex flex-col items-center leading-tight mt-1 gap-[1px]">
                                            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-wide">with</span>
                                            <span className="text-[9px] font-bold text-gray-900 tracking-tight">Sportstech Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Folding Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1.5 flex flex-col items-center min-h-[55px] justify-between">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[12px] font-bold text-gray-600">Folding</span>
                                            <span className="text-[12px] font-bold text-gray-600">Function</span>
                                        </div>

                                        {/* Folding Icon */}
                                        <div className="mb-0.5">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 5V19" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
                                                <path d="M17 19L8 9" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Fitness App Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* App Icon */}
                                        <div className="mb-1.5">
                                            <svg width="26" height="14" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1" y="1" width="26" height="14" rx="3" stroke="#111827" strokeWidth="2" />
                                                <path d="M6 8H9L11 5L14 11L16 8H22" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[12px] font-bold text-gray-600">Fitness app</span>
                                            <span className="text-[12px] font-bold text-gray-600">compatible</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeModel === "row" || activeModel === "bike" ? (
                            // sRow & sBike Specs
                            <div className="flex items-center justify-between gap-4 md:gap-8 min-w-max px-4">
                                {/* Screen Spec (Row) */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <span className="text-3xl font-black text-gray-900 leading-none tracking-tight">21.5"</span>
                                        <div className="flex flex-col items-center leading-tight mt-1 gap-[1px]">
                                            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-wide">with</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Sportstech Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Workout Video Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-5 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* Video Icon */}
                                        <div className="mb-1">
                                            <svg width="22" height="18" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="2" y="3" width="20" height="14" rx="2" stroke="#111827" strokeWidth="2" />
                                                <path d="M10 7L15 10L10 13V7Z" fill="#111827" />
                                                {/* <circle cx="19" cy="15" r="3" fill="#111827" stroke="white" strokeWidth="1" /> */}
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[12px] font-bold text-gray-600">Workout</span>
                                            <span className="text-[12px] font-bold text-gray-600">Video</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fitness App Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        {/* App Icon */}
                                        <div className="mb-1.5">
                                            <svg width="26" height="14" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1" y="1" width="26" height="14" rx="3" stroke="#111827" strokeWidth="2" />
                                                <path d="M6 8H9L11 5L14 11L16 8H22" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[11px] font-bold text-gray-600">Fitness app</span>
                                            <span className="text-[11px] font-bold text-gray-600">compatible</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Default Treadmill Specs
                            <div className="flex items-center h-[75px] justify-between gap-4 md:gap-8 min-w-max px-4">
                                {/* Speed Spec */}
                                <div className="flex items-center justify-center min-w-[100px] border-r border-gray-300/60 pr-6">
                                    <div className="flex flex-col items-start gap-[2px]">
                                        {/* Top Lines */}
                                        <div className="flex flex-col gap-[3px] w-full items-start pl-2">
                                            <div className="w-[50px] h-[1.5px] bg-gray-900"></div>
                                            <div className="w-[70px] h-[1.5px] bg-gray-900 ml-4"></div>
                                        </div>

                                        <div className="flex items-end gap-1.5 my-0.5">
                                            <span className="text-4xl font-black text-gray-900 leading-[0.8] tracking-tight">20</span>
                                            <div className="flex flex-col justify-end leading-none gap-[2px] pb-[1px]">
                                                <span className="text-[10px] font-bold text-gray-600 leading-none">km/h</span>
                                                <div className="bg-black text-white px-1.5 py-[1px] rounded-[2px] text-[8px] font-black leading-none tracking-wide">MAX</div>
                                            </div>
                                        </div>

                                        {/* Bottom Lines */}
                                        <div className="flex flex-col gap-[3px] w-full items-end pr-2">
                                            <div className="w-[60px] h-[1.5px] bg-gray-900 mr-2"></div>
                                            <div className="w-[45px] h-[1.5px] bg-gray-900"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Screen Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center">
                                        {/* Bracket Caps */}
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <span className="text-3xl font-black text-gray-900 leading-none tracking-tight">21.5"</span>
                                        <div className="flex flex-col items-center leading-tight mt-1 gap-[1px]">
                                            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-wide">with</span>
                                            <span className="text-[9px] font-bold text-gray-900 tracking-tight">Sportstech Live</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Surface Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative w-[90px] h-[60px] flex items-center justify-center">
                                        <svg width="100%" height="120%" viewBox="0 0 90 55" fill="none" className="absolute inset-0">
                                            {/* Trapezoid Frame */}
                                            <path d="M20 5 H70 L85 50 H5 L20 5 Z" stroke="#1f2937" strokeWidth="1.5" strokeLinejoin="round" />
                                            {/* Inner Detail Lines - Left */}
                                            <line x1="24" y1="12" x2="21" y2="22" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
                                            <line x1="27" y1="12" x2="24" y2="22" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
                                            {/* Inner Detail Lines - Right */}
                                            <line x1="66" y1="12" x2="69" y2="22" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
                                            <line x1="63" y1="12" x2="66" y2="22" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
                                            {/* Bottom Deck Line */}
                                            <line x1="15" y1="45" x2="80" y2="45" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <div className="relative z-10 flex flex-col items-center justify-center text-center pt-3">
                                            <span className="text-[9px] font-bold text-gray-800 leading-[1.1]">Large<br />Running<br />Surface</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Incline Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <div className="flex flex-col items-start pl-2">
                                        {/* Rising Bars */}
                                        <div className="flex items-end gap-[3px] h-5 mb-1 w-full pl-1">
                                            <div className="w-[2.5px] h-[25%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[35%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[45%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[55%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[65%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[75%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[85%] bg-black rounded-sm"></div>
                                            <div className="w-[2.5px] h-[100%] bg-black rounded-sm"></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-3xl font-black text-gray-900 leading-none">15</span>
                                            <div className="flex flex-col leading-none gap-[1px]">
                                                <span className="text-[10px] font-bold text-gray-600">Incline</span>
                                                <span className="text-[10px] font-bold text-gray-600">Levels</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: CTA */}
                <div className="flex justify-end min-w-[200px]">
                    <button className="group flex items-center gap-3 bg-[#1A1A1A] hover:bg-black text-white pl-8 pr-6 py-3.5 rounded-full font-bold text-sm transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                        Discover more
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div >
        </section >
    );
}
