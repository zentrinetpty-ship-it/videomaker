import React from 'react';
import { Search, Bell, ChevronDown, Plus, Sparkles } from 'lucide-react';

interface DashboardHeaderProps {
    userCredits?: number;
    onCreateNew: () => void;
}

const DashboardHeader = ({ userCredits = 1250, onCreateNew }: DashboardHeaderProps) => {
    return (
        <header className="h-16 border-b border-white/[0.08] bg-black/20 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left: Search */}
            <div className="flex items-center gap-4 flex-1">
                <div className="relative max-w-md w-full hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search projects, assets, or templates... (Cmd + K)"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-white/[0.1] bg-white/[0.05] px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-4">
                {/* Credits Display */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/[0.08]">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-xs font-medium text-gray-300">
                        <span className="text-white font-semibold">{userCredits.toLocaleString()}</span> Credits
                    </span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
                </button>

                {/* Create Button */}
                <button
                    onClick={onCreateNew}
                    className="hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
                >
                    <Plus className="w-4 h-4" />
                    Create New
                </button>

                {/* Profile Dropdown */}
                <button className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ring-2 ring-white/10" />
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
