"use client";

import React from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between h-[8vh] px-5 bg-white shadow-sm font-sans">
            <div className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="Sportstech"
                    width={180}
                    height={40}
                    className="h-8 w-auto object-contain"
                    priority
                />
            </div>
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-gray-700 uppercase tracking-wide">
                <a href="#" className="hover:text-red-600 transition-colors">Treadmills</a>
                <a href="#" className="hover:text-red-600 transition-colors">Bikes & Exercise Bikes</a>
                <a href="#" className="hover:text-red-600 transition-colors">Rowing machines</a>
                <a href="#" className="hover:text-red-600 transition-colors">Strength training</a>
                <a href="#" className="hover:text-red-600 transition-colors">Cross trainer</a>
                <a href="#" className="hover:text-red-600 transition-colors">Vibration plates</a>
                <a href="#" className="hover:text-red-600 transition-colors">Accesories</a>
                <a href="#" className="hover:text-red-600 transition-colors">App</a>
                <a href="#" className="bg-black text-white px-3 py-1.5 rounded-sm hover:bg-gray-800 transition-colors">
                    % Sale
                </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 text-gray-700">
                <button className="hover:text-red-600">
                    <Search size={20} />
                </button>
                <button className="hover:text-red-600">
                    <ShoppingCart size={20} />
                </button>
                <button className="hover:text-red-600">
                    <User size={20} />
                </button>
            </div>
        </nav>
    );
}
