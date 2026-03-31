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
            className={`w-full h-full ${className}`}
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
                        className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform "
                        style={{ transform: `translateX(-${MODELS.findIndex(m => m.id === activeModel) * 100}%)` }}
                    >
                        {MODELS.map((model) => (
                            <div key={model.id} className="w-full h-full flex-shrink-0 flex items-center justify-center ">
                                {model.id === "pro" && (
                                    <VideoPlayer
                                        src="/videos/sTread.webm"
                                        className="scale-120 -translate-y-4"
                                        isActive={activeModel === model.id}
                                    />
                                )}
                                {model.id === "row" && (
                                    <VideoPlayer
                                        src="https://s3.us-east-1.amazonaws.com/sportstech.team/videos/sRow_UIUX_Animation.webm"
                                        className=" scale-130 -translate-y-20 md:-translate-y-32 xl:-translate-y-25"
                                        isActive={activeModel === model.id}
                                    />
                                )}
                                {model.id === "bike" && (
                                    <VideoPlayer
                                        src="https://s3.us-east-1.amazonaws.com/sportstech.team/videos/sBike_UIUX_Animation.webm"
                                        className="scale-130 -translate-y-4 md:scale-100 md:-translate-y-6"
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

                                {/* Practical cable Pull Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="transform scale-[0.6] min-w-max mb-1 -my-2 flex flex-col items-center justify-center">
                                            <svg width="28" height="28" viewBox="0 0 78 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.57131 48.2617V50.3477H5.90602V45.3718H8.94143C9.99481 45.3718 10.7017 45.8638 10.7017 46.8133C10.7017 47.7488 9.99481 48.2617 8.94143 48.2617H6.57131ZM6.57131 47.6865H8.90678C9.61366 47.6865 10.0433 47.3746 10.0433 46.8133C10.0433 46.2519 9.61366 45.947 8.90678 45.947H6.57131V47.6865ZM13.6296 46.744V47.3677C13.4771 47.333 13.3801 47.3122 13.2068 47.3122C12.3752 47.3122 11.8208 47.7974 11.8208 48.6428V50.3477H11.1971V46.7232H11.8208V47.4855C12.0911 47.0073 12.5485 46.6955 13.2207 46.6955C13.387 46.6955 13.5326 46.7163 13.6296 46.744ZM15.2721 50.4239C14.4613 50.4239 13.8168 50.0497 13.8168 49.3359C13.8168 48.6636 14.3989 48.3171 15.2513 48.2201L16.8522 48.0399V47.9498C16.8522 47.4924 16.478 47.1875 15.7711 47.1875C15.1543 47.1875 14.6276 47.4786 14.4752 47.8944L13.9554 47.6588C14.1841 47.0489 14.9395 46.6539 15.785 46.6539C16.8314 46.6539 17.4551 47.1182 17.4551 47.9567V49.5923C17.4551 49.8625 17.6353 49.9388 18.0373 49.8487V50.3477C17.3443 50.4793 16.97 50.2229 16.9077 49.8002L16.9007 49.7655C16.575 50.1813 15.9582 50.4239 15.2721 50.4239ZM16.8522 48.8993V48.5389L15.3414 48.7121C14.8009 48.7745 14.4267 48.9131 14.4267 49.3289C14.4267 49.7032 14.7801 49.9111 15.3206 49.9111C16.0345 49.9111 16.8522 49.5784 16.8522 48.8993ZM18.2434 48.5389C18.2434 47.4301 19.1235 46.6539 20.3016 46.6539C21.2788 46.6539 21.9441 47.2152 22.1589 47.8667L21.6461 48.1369C21.5006 47.6102 21.0016 47.1875 20.2947 47.1875C19.47 47.1875 18.8394 47.7142 18.8394 48.5389C18.8394 49.3566 19.47 49.8833 20.2947 49.8833C21.0016 49.8833 21.5006 49.4606 21.6461 48.9339L22.152 49.218C21.9372 49.8695 21.2788 50.4239 20.3016 50.4239C19.1235 50.4239 18.2434 49.6477 18.2434 48.5389ZM23.1385 49.2111V47.2568H22.2584V46.7232H23.1385V45.6629H23.7553V46.7232H25.4324V47.2568H23.7553V49.1557C23.7553 49.6685 24.0602 49.8279 24.6077 49.8279C24.9126 49.8279 25.1898 49.7586 25.4532 49.6616L25.5641 50.1952C25.2869 50.3061 24.878 50.3892 24.5107 50.3892C23.7484 50.3892 23.1385 50.0843 23.1385 49.2111ZM26.0922 46.0925V45.3718H26.7714V46.0925H26.0922ZM26.7437 46.7232V50.3477H26.1199V46.7232H26.7437ZM27.4001 48.5389C27.4001 47.4301 28.2803 46.6539 29.4584 46.6539C30.4355 46.6539 31.1008 47.2152 31.3157 47.8667L30.8028 48.1369C30.6573 47.6102 30.1583 47.1875 29.4515 47.1875C28.6268 47.1875 27.9961 47.7142 27.9961 48.5389C27.9961 49.3566 28.6268 49.8833 29.4515 49.8833C30.1583 49.8833 30.6573 49.4606 30.8028 48.9339L31.3087 49.218C31.0939 49.8695 30.4355 50.4239 29.4584 50.4239C28.2803 50.4239 27.4001 49.6477 27.4001 48.5389ZM33.0984 50.4239C32.2875 50.4239 31.643 50.0497 31.643 49.3359C31.643 48.6636 32.2252 48.3171 33.0776 48.2201L34.6784 48.0399V47.9498C34.6784 47.4924 34.3042 47.1875 33.5973 47.1875C32.9805 47.1875 32.4538 47.4786 32.3014 47.8944L31.7816 47.6588C32.0103 47.0489 32.7657 46.6539 33.6112 46.6539C34.6576 46.6539 35.2814 47.1182 35.2814 47.9567V49.5923C35.2814 49.8625 35.4615 49.9388 35.8635 49.8487V50.3477C35.1705 50.4793 34.7962 50.2229 34.7339 49.8002L34.7269 49.7655C34.4012 50.1813 33.7844 50.4239 33.0984 50.4239ZM34.6784 48.8993V48.5389L33.1677 48.7121C32.6271 48.7745 32.2529 48.9131 32.2529 49.3289C32.2529 49.7032 32.6063 49.9111 33.1469 49.9111C33.8607 49.9111 34.6784 49.5784 34.6784 48.8993ZM36.9562 45.3718V50.3477H36.3325V45.3718H36.9562ZM39.3384 48.5389C39.3384 47.4301 40.2186 46.6539 41.3967 46.6539C42.3738 46.6539 43.0391 47.2152 43.254 47.8667L42.7411 48.1369C42.5956 47.6102 42.0966 47.1875 41.3898 47.1875C40.5651 47.1875 39.9344 47.7142 39.9344 48.5389C39.9344 49.3566 40.5651 49.8833 41.3898 49.8833C42.0966 49.8833 42.5956 49.4606 42.7411 48.9339L43.247 49.218C43.0322 49.8695 42.3738 50.4239 41.3967 50.4239C40.2186 50.4239 39.3384 49.6477 39.3384 48.5389ZM45.0366 50.4239C44.2258 50.4239 43.5813 50.0497 43.5813 49.3359C43.5813 48.6636 44.1634 48.3171 45.0158 48.2201L46.6167 48.0399V47.9498C46.6167 47.4924 46.2425 47.1875 45.5356 47.1875C44.9188 47.1875 44.3921 47.4786 44.2397 47.8944L43.7199 47.6588C43.9486 47.0489 44.704 46.6539 45.5495 46.6539C46.5959 46.6539 47.2196 47.1182 47.2196 47.9567V49.5923C47.2196 49.8625 47.3998 49.9388 47.8018 49.8487V50.3477C47.1088 50.4793 46.7345 50.2229 46.6722 49.8002L46.6652 49.7655C46.3395 50.1813 45.7227 50.4239 45.0366 50.4239ZM46.6167 48.8993V48.5389L45.1059 48.7121C44.5654 48.7745 44.1912 48.9131 44.1912 49.3289C44.1912 49.7032 44.5446 49.9111 45.0852 49.9111C45.799 49.9111 46.6167 49.5784 46.6167 48.8993ZM48.8945 49.7101V50.3477H48.2708V45.3718H48.8945V47.3608C49.1647 46.9727 49.6984 46.6539 50.4191 46.6539C51.6388 46.6539 52.4011 47.4855 52.4011 48.5389C52.4011 49.5853 51.6388 50.4239 50.4191 50.4239C49.6984 50.4239 49.1647 50.1051 48.8945 49.7101ZM48.8667 48.5112V48.5597C48.8667 49.3844 49.5806 49.8903 50.3429 49.8903C51.1537 49.8903 51.8051 49.3774 51.8051 48.5389C51.8051 47.6934 51.1537 47.1806 50.3429 47.1806C49.5806 47.1806 48.8667 47.6934 48.8667 48.5112ZM53.686 45.3718V50.3477H53.0623V45.3718H53.686ZM56.4008 49.8833C57.1007 49.8833 57.5997 49.523 57.766 49.0171L58.2719 49.2804C58.0571 49.8903 57.3779 50.4239 56.4008 50.4239C55.2018 50.4239 54.3425 49.6477 54.3425 48.5389C54.3425 47.4647 55.181 46.6539 56.4008 46.6539C57.5858 46.6539 58.3273 47.4439 58.3273 48.4557V48.6983H54.9316C55.0078 49.419 55.6038 49.8833 56.4008 49.8833ZM56.373 47.1806C55.6731 47.1806 55.0979 47.5687 54.9593 48.2201H57.7175C57.6759 47.7281 57.1839 47.1806 56.373 47.1806ZM61.4171 48.2617V50.3477H60.7518V45.3718H63.7872C64.8406 45.3718 65.5474 45.8638 65.5474 46.8133C65.5474 47.7488 64.8406 48.2617 63.7872 48.2617H61.4171ZM61.4171 47.6865H63.7525C64.4594 47.6865 64.8891 47.3746 64.8891 46.8133C64.8891 46.2519 64.4594 45.947 63.7525 45.947H61.4171V47.6865ZM69.5911 46.7232V50.3477H68.9674V49.7239C68.7109 50.0982 68.2674 50.4239 67.5744 50.4239C66.5765 50.4239 66.0151 49.7517 66.0151 48.7676V46.7232H66.6388V48.6983C66.6388 49.3913 66.9853 49.8487 67.7338 49.8487C68.4545 49.8487 68.9674 49.3636 68.9674 48.5943V46.7232H69.5911ZM71.1129 45.3718V50.3477H70.4892V45.3718H71.1129ZM72.6357 45.3718V50.3477H72.012V45.3718H72.6357Z" fill="#1E1E1E"/>
                                                <path d="M54.6734 5.09375H21.4724C21.164 5.09375 20.9141 5.34374 20.9141 5.65209C20.9141 5.96044 21.164 6.21043 21.4724 6.21043H37.5146V8.17436H29.4535C29.1248 8.17436 28.8584 8.4408 28.8584 8.76948V17.1611C28.8584 18.6165 30.0382 19.7963 31.4936 19.7963H37.5146V23.4125L31.6071 25.7879C30.8938 26.0747 30.433 26.7567 30.433 27.5254V29.7456C30.433 30.7782 31.2731 31.6183 32.3057 31.6183H32.4726V32.1595C32.4726 32.563 32.6994 32.9131 33.0323 33.0905V36.9776C33.0323 37.7021 33.4278 38.3689 34.0637 38.7161L34.6091 39.0141C35.0098 39.2329 35.259 39.6531 35.259 40.1097V41.3269H36.6174H37.4503H40.935V39.737C40.935 39.3853 41.0834 39.0499 41.3437 38.8133L43.4044 36.9398L45.8533 32.5253C46.0352 32.0901 45.9062 31.587 45.5373 31.2931L45.24 31.0696C45.5372 30.7383 45.7129 30.2779 45.7129 29.7457V27.529C45.7129 26.7573 45.2496 26.0742 44.5326 25.7889L38.6314 23.4407V19.7963H44.6523C46.1077 19.7963 47.2875 18.6165 47.2875 17.1611V8.7694C47.2875 8.44073 47.0211 8.17429 46.6924 8.17429H38.6313V6.21043H54.6733C54.9817 6.21043 55.2316 5.96044 55.2316 5.65209C55.2316 5.34374 54.9817 5.09375 54.6734 5.09375ZM44.1196 26.8264C44.4091 26.9415 44.5961 27.2173 44.5961 27.5288V29.7455C44.5961 29.981 44.522 30.2429 44.3342 30.3883L42.25 28.8207L41.7791 30.1439C41.7769 30.15 41.7746 30.1561 41.7722 30.1622C41.6017 30.5928 41.7194 31.0892 42.0652 31.3973L42.8913 32.1336C43.0106 32.2399 43.0787 32.3924 43.0782 32.5522C43.0776 32.7121 43.0086 32.864 42.8887 32.9696L40.1244 35.4021C39.9873 35.5227 39.8 35.5686 39.6227 35.5253C39.5916 35.5178 36.4394 34.7988 35.7676 36.2822C35.6742 36.4884 35.4711 36.6103 35.2587 36.6103C35.1816 36.6103 35.1034 36.5943 35.0287 36.5604C34.7478 36.4333 34.6232 36.1024 34.7504 35.8215C35.6585 33.816 38.6412 34.199 39.5967 34.3791L41.6777 32.5478L41.3223 32.2309C40.6308 31.6146 40.3935 30.6231 40.7302 29.7608L41.1746 28.5126C40.9845 28.2358 40.6661 28.054 40.3049 28.054H40.1656C39.6662 28.054 39.2488 28.4016 39.1398 28.8679V32.5528C39.1398 32.8611 38.8899 33.1111 38.5814 33.1111C38.273 33.1111 38.0231 32.8611 38.0231 32.5528V28.8984C37.9257 28.4167 37.5001 28.054 36.9897 28.054H36.8505C36.3442 28.054 35.9215 28.411 35.8197 28.8869V32.5528C35.8197 32.8611 35.5697 33.1111 35.2613 33.1111C34.953 33.1111 34.703 32.8611 34.703 32.5528V28.918C34.6133 28.4267 34.1838 28.054 33.6666 28.054H33.5274C32.945 28.054 32.4729 28.5261 32.4729 29.1085V30.5016H32.306C31.8891 30.5016 31.55 30.1624 31.55 29.7455V27.5253C31.55 27.215 31.736 26.9397 32.024 26.8239L38.0371 24.406L44.1196 26.8264ZM44.9608 10.0023C45.2167 10.0023 45.4241 10.2097 45.4241 10.4656V16.2496C45.4241 17.1769 44.6724 17.9286 43.7451 17.9286H32.4006C31.4734 17.9286 30.7217 17.1769 30.7217 16.2496V10.4656C30.7217 10.2097 30.9291 10.0023 31.185 10.0023H44.9608Z" fill="#1E1E1E"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Practical cable</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Pull</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Folding Spec */}
                                {/* Folding Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1.5 flex flex-col items-center min-h-[55px] justify-between">
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>

                                        <div className="mb-0.5">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 5V19" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
                                                <path d="M17 19L8 9" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-900 px-2 tracking-tight">Folding Function</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Electric Motors Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <div className="relative border-x-2 border-gray-900 px-4 py-1.5 flex flex-col items-center min-h-[55px] justify-center">
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        
                                        <div className="mb-0.5">
                                            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g transform="translate(1, 2)">
                                                    <rect x="8" y="2" width="14" height="16" rx="2" fill="#111827" />
                                                    <rect x="5" y="4" width="3" height="12" rx="1" fill="#111827" />
                                                    <rect x="2" y="8" width="3" height="4" fill="#111827" />
                                                    <rect x="0" y="9" width="3" height="2" fill="#111827" />
                                                    <path d="M22 2 C 26 2, 26 18, 22 18 Z" fill="#111827" />
                                                    <line x1="8" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.5" />
                                                    <line x1="8" y1="10" x2="23" y2="10" stroke="white" strokeWidth="1.5" />
                                                    <line x1="8" y1="14" x2="21" y2="14" stroke="white" strokeWidth="1.5" />
                                                    <circle cx="5" cy="10" r="1.5" fill="white" />
                                                </g>
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center leading-tight gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">60 kg Electric</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Motors</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activeModel === "row" || activeModel === "bike" ? (
                            // sRow & sBike Specs
                            <div className="flex items-center justify-between gap-4 md:gap-8 min-w-max px-4">
                                {/* Magnetic Brake Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="flex flex-col items-center justify-center mb-0.5">
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5 C4 8 4 20 9 23" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                                                <path d="M19 5 C24 8 24 20 19 23" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                                                <circle cx="14" cy="14" r="5.5" fill="#111827" />
                                                <circle cx="14" cy="14" r="1.5" fill="white" />
                                                <circle cx="14" cy="10" r="0.8" fill="white" />
                                                <circle cx="14" cy="18" r="0.8" fill="white" />
                                                <circle cx="10" cy="14" r="0.8" fill="white" />
                                                <circle cx="18" cy="14" r="0.8" fill="white" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-center leading-none gap-[1px]">
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Magnetic</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">brake</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rotating Display Spec */}
                                <div className="flex items-center justify-center min-w-[110px] border-r border-gray-300/60 pr-6">
                                    <div className="relative border-x-2 border-gray-900 px-3 py-1 flex flex-col items-center min-h-[55px] justify-center">
                                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute top-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-gray-900"></div>
                                        <div className="flex flex-col items-center justify-center mt-1">
                                            <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="2" y="3" width="30" height="18" rx="3" stroke="#111827" strokeWidth="2.5" />
                                                <text x="17" y="14" fontSize="9" fontWeight="900" fill="#111827" textAnchor="middle">360°</text>
                                                <path d="M10 15 C13 18 21 18 24 15" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                                <path d="M24 15 L22 13.5 M24 15 L24.5 17.5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-center leading-none gap-[1px] mt-1">
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Rotating</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tight">Display</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Workout Video Spec */}
                                <div className="flex items-center justify-center min-w-[110px]">
                                    <svg width="78" height="56" viewBox="0 0 78 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.0175 0.613281L3.68559 0.613281C1.99096 0.613281 0.617188 1.98705 0.617188 3.68169V51.5428C0.617188 53.2374 1.99096 54.6112 3.68559 54.6112H16.0175" stroke="#1E1E1E" strokeWidth="1.22736" strokeLinecap="round" />
                                        <path d="M61.4434 54.6133L73.7753 54.6133C75.47 54.6133 76.8437 53.2395 76.8437 51.5449L76.8437 3.68379C76.8437 1.98916 75.47 0.615385 73.7753 0.615385L61.4434 0.615386" stroke="#1E1E1E" strokeWidth="1.22736" strokeLinecap="round" />
                                        <path d="M10.3073 49.1914H9.65584V44.2155H14.202V44.7977H10.3073V46.3986H13.807V46.9807H10.3073V49.1914ZM16.2613 45.4976C17.4117 45.4976 18.2919 46.2669 18.2919 47.3826C18.2919 48.4915 17.4117 49.2676 16.2613 49.2676C15.0971 49.2676 14.2239 48.4915 14.2239 47.3826C14.2239 46.2669 15.0971 45.4976 16.2613 45.4976ZM16.2613 48.7271C17.0652 48.7271 17.6889 48.2004 17.6889 47.3826C17.6889 46.5579 17.0652 46.0382 16.2613 46.0382C15.4436 46.0382 14.8198 46.5579 14.8198 47.3826C14.8198 48.2004 15.4436 48.7271 16.2613 48.7271ZM19.5771 44.2155V49.1914H18.9534V44.2155H19.5771ZM23.7403 48.5538C23.47 48.9489 22.9364 49.2676 22.2156 49.2676C20.9959 49.2676 20.2336 48.4291 20.2336 47.3826C20.2336 46.3292 20.9959 45.4976 22.2156 45.4976C22.9364 45.4976 23.47 45.8164 23.7403 46.2045V44.2155H24.364V49.1914H23.7403V48.5538ZM23.768 47.3549C23.768 46.5372 23.0542 46.0243 22.2919 46.0243C21.481 46.0243 20.8296 46.5372 20.8296 47.3826C20.8296 48.2212 21.481 48.734 22.2919 48.734C23.0542 48.734 23.768 48.2281 23.768 47.4034V47.3549ZM25.24 44.9363V44.2155H25.9191V44.9363H25.24ZM25.8914 45.5669V49.1914H25.2677V45.5669H25.8914ZM26.7905 49.1914V45.5669H27.4142V46.2045C27.6706 45.8233 28.1626 45.4976 28.8418 45.4976C29.8536 45.4976 30.408 46.1906 30.408 47.1747V49.1914H29.7774V47.2718C29.7774 46.5857 29.4239 46.0728 28.6685 46.0728C27.9409 46.0728 27.4142 46.5718 27.4142 47.3411V49.1914H26.7905ZM35.1376 48.7271C35.1376 49.8221 34.2436 50.5151 33.0308 50.5151C32.0675 50.5151 31.326 50.127 31.0488 49.4825L31.5547 49.1637C31.7626 49.6973 32.3447 49.9953 33.0169 49.9953C33.8624 49.9953 34.5139 49.5656 34.5139 48.7756V48.4707C34.2366 48.8518 33.7307 49.1706 33.0031 49.1706C31.7764 49.1706 31.0141 48.3459 31.0141 47.3272C31.0141 46.3154 31.7764 45.4976 33.0031 45.4976C33.7307 45.4976 34.2366 45.8164 34.5139 46.1906V45.5669H35.1376V48.7271ZM34.5416 47.3133C34.5416 46.4817 33.807 46.0174 33.0724 46.0174C32.2546 46.0174 31.617 46.5302 31.617 47.3272C31.617 48.1311 32.2546 48.637 33.0724 48.637C33.807 48.637 34.5416 48.1796 34.5416 47.3411V47.3133ZM38.4678 49.1914H37.8164V44.2155H42.3626V44.7977H38.4678V46.3986H41.9676V46.9807H38.4678V49.1914ZM46.1752 45.5669V49.1914H45.5515V48.5677C45.2951 48.9419 44.8515 49.2676 44.1585 49.2676C43.1606 49.2676 42.5992 48.5954 42.5992 47.6113V45.5669H43.223V47.542C43.223 48.235 43.5695 48.6924 44.3179 48.6924C45.0387 48.6924 45.5515 48.2073 45.5515 47.4381V45.5669H46.1752ZM47.0734 49.1914V45.5669H47.6971V46.2045C47.9535 45.8233 48.4455 45.4976 49.1247 45.4976C50.1365 45.4976 50.6909 46.1906 50.6909 47.1747V49.1914H50.0603V47.2718C50.0603 46.5857 49.7068 46.0728 48.9514 46.0728C48.2238 46.0728 47.6971 46.5718 47.6971 47.3411V49.1914H47.0734ZM51.3178 47.3826C51.3178 46.2738 52.198 45.4976 53.3761 45.4976C54.3532 45.4976 55.0185 46.059 55.2334 46.7104L54.7205 46.9807C54.575 46.454 54.076 46.0313 53.3691 46.0313C52.5445 46.0313 51.9138 46.5579 51.9138 47.3826C51.9138 48.2004 52.5445 48.7271 53.3691 48.7271C54.076 48.7271 54.575 48.3043 54.7205 47.7777L55.2264 48.0618C55.0116 48.7132 54.3532 49.2676 53.3761 49.2676C52.198 49.2676 51.3178 48.4915 51.3178 47.3826ZM56.213 48.0549V46.1006H55.3328V45.5669H56.213V44.5066H56.8297V45.5669H58.5068V46.1006H56.8297V47.9994C56.8297 48.5123 57.1347 48.6716 57.6821 48.6716C57.9871 48.6716 58.2643 48.6023 58.5276 48.5053L58.6385 49.0389C58.3613 49.1498 57.9524 49.233 57.5851 49.233C56.8228 49.233 56.213 48.9281 56.213 48.0549ZM59.1667 44.9363V44.2155H59.8458V44.9363H59.1667ZM59.8181 45.5669V49.1914H59.1944V45.5669H59.8181ZM62.512 45.4976C63.6624 45.4976 64.5426 46.2669 64.5426 47.3826C64.5426 48.4915 63.6624 49.2676 62.512 49.2676C61.3478 49.2676 60.4746 48.4915 60.4746 47.3826C60.4746 46.2669 61.3478 45.4976 62.512 45.4976ZM62.512 48.7271C63.3159 48.7271 63.9396 48.2004 63.9396 47.3826C63.9396 46.5579 63.3159 46.0382 62.512 46.0382C61.6943 46.0382 61.0706 46.5579 61.0706 47.3826C61.0706 48.2004 61.6943 48.7271 62.512 48.7271ZM65.2041 49.1914V45.5669H65.8278V46.2045C66.0843 45.8233 66.5763 45.4976 67.2555 45.4976C68.2673 45.4976 68.8217 46.1906 68.8217 47.1747V49.1914H68.191V47.2718C68.191 46.5857 67.8376 46.0728 67.0822 46.0728C66.3545 46.0728 65.8278 46.5718 65.8278 47.3411V49.1914H65.2041Z" fill="#1E1E1E" />
                                        <path d="M63.7951 28.8135C62.6392 28.8162 61.5101 29.1644 60.5505 29.814C59.591 30.4636 58.8443 31.3854 58.4047 32.4627H21.2688C21.0437 31.9281 20.7384 31.4316 20.3635 30.9906L48.3235 32.1517H48.4675C48.5701 32.1615 48.6735 32.1615 48.7761 32.1517C49.3529 32.1526 49.92 32.0025 50.422 31.7163C50.8273 31.503 51.1856 31.2094 51.4755 30.8531C51.7654 30.4968 51.9809 30.0852 52.1091 29.6429C52.3205 28.7941 52.2071 27.8963 51.7916 27.128C51.3761 26.3596 50.6888 25.777 49.8665 25.496L37.7279 21.3906L51.3273 14.8386H51.4713C51.9904 14.5435 52.4287 14.1231 52.7469 13.6152C52.9883 13.2154 53.1457 12.7698 53.2094 12.3062C53.2731 11.8426 53.2417 11.3707 53.1172 10.9198C52.9378 10.0539 52.4383 9.28926 51.7199 8.78098C51.0016 8.2727 50.1183 8.05886 49.2493 8.18284L28.9223 12.3297C28.534 12.4388 28.1278 12.4675 27.7283 12.4141C27.3287 12.3606 26.944 12.2261 26.5974 12.0187C25.4165 11.3457 24.0229 11.1599 22.709 11.5003L20.8779 11.998C20.2702 12.1626 19.7028 12.452 19.2114 12.8481V10.5051C19.2114 10.2301 19.103 9.96643 18.9101 9.77201C18.7172 9.57759 18.4555 9.46836 18.1827 9.46836H13.389C13.1161 9.46836 12.8545 9.57759 12.6616 9.77201C12.4687 9.96643 12.3603 10.2301 12.3603 10.5051V29.8502C12.3506 29.8841 12.3506 29.92 12.3603 29.9539C11.6167 30.4987 11.0112 31.2126 10.5929 32.0377C10.1746 32.8627 9.95543 33.7756 9.95312 34.7021V36.423C9.95312 36.8794 10.133 37.3172 10.4533 37.6399C10.7735 37.9626 11.2079 38.144 11.6608 38.144H19.8903C20.0067 38.154 20.1237 38.154 20.2401 38.144C20.3557 38.1654 20.4742 38.1654 20.5898 38.144H68.5888C68.8616 38.144 69.1233 38.0347 69.3162 37.8403C69.5091 37.6459 69.6175 37.3822 69.6175 37.1072V34.7021C69.6175 33.1439 69.0047 31.6493 67.9134 30.5455C66.8221 29.4418 65.3412 28.819 63.7951 28.8135ZM17.154 28.8135H14.4177V20.9345C14.8488 21.1258 15.3147 21.2246 15.7858 21.2246C16.2569 21.2246 16.7229 21.1258 17.154 20.9345V28.8135ZM15.7755 19.1513C15.5029 19.1513 15.2364 19.0698 15.0097 18.9172C14.783 18.7645 14.6064 18.5476 14.502 18.2937C14.3977 18.0399 14.3704 17.7606 14.4236 17.4911C14.4768 17.2216 14.6081 16.9741 14.8008 16.7798C14.9936 16.5855 15.2392 16.4532 15.5066 16.3996C15.774 16.346 16.0512 16.3735 16.3031 16.4786C16.5549 16.5838 16.7702 16.7618 16.9217 16.9903C17.0732 17.2188 17.154 17.4873 17.154 17.7621C17.154 18.1305 17.0088 18.4839 16.7503 18.7444C16.4917 19.0049 16.1411 19.1513 15.7755 19.1513ZM17.154 14.6105C16.7265 14.4058 16.2591 14.2997 15.7858 14.2997C15.3125 14.2997 14.8452 14.4058 14.4177 14.6105V11.5418H17.154V14.6105ZM40.526 29.7466L22.2975 29.0001L28.4697 25.9314L40.526 29.7466ZM34.9916 20.4576L31.3911 19.255L42.4805 16.7876L34.9916 20.4576ZM21.4128 14.0507L23.3262 13.553C24.1114 13.342 24.9476 13.4539 25.651 13.864C26.8079 14.5402 28.1813 14.7337 29.4778 14.4031L49.7431 10.2563C50.0914 10.1861 50.4531 10.252 50.7549 10.4406C51.0568 10.6293 51.2761 10.9266 51.3684 11.2723C51.4184 11.4535 51.4295 11.6433 51.4011 11.8292C51.3728 12.0151 51.3055 12.1927 51.2038 12.3504C51.1095 12.5142 50.9819 12.6561 50.8295 12.7668C50.677 12.8776 50.5032 12.9547 50.3192 12.9932L28.5519 17.7621C28.4264 17.6451 28.3158 17.5127 28.2228 17.3681C27.7714 16.5847 27.1171 15.9397 26.33 15.5021C25.9511 15.2684 25.5429 15.0871 25.1161 14.963L23.3262 14.4653C22.9714 14.3649 22.6042 14.316 22.2358 14.3202H21.9271H21.2276H21.0836C20.8216 14.3646 20.5659 14.4412 20.3224 14.5483C20.6407 14.2962 21.0148 14.1255 21.4128 14.0507ZM19.2114 28.2122V22.6347C19.6889 23.0239 20.2428 23.3066 20.8367 23.464L25.7127 25.0191L19.2114 28.2122Z" fill="black" />
                                    </svg>
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
