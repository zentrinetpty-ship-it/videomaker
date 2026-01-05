import React from 'react';
import {
    Plus,
    Video,
    FileText,
    Sparkles,
    Clock,
    Play,
    Film,
    Zap
} from 'lucide-react';
import StatsCard from '@/components/ui/stats-card';
import { cn } from '@/lib/utils';

interface DashboardHomeProps {
    onCreateNew: () => void;
}

const DashboardHome = ({ onCreateNew }: DashboardHomeProps) => {
    const recentProjects = [
        { id: 1, title: "The Martian Colony", type: "Sci-Fi", status: "Completed", thumbnail: "bg-orange-500/20", duration: "2:15", date: "2h ago" },
        { id: 2, title: "Product Launch V2", type: "Marketing", status: "Rendering", thumbnail: "bg-blue-500/20", duration: "0:45", date: "5h ago" },
        { id: 3, title: "Fantasy World Intro", type: "Fantasy", status: "Draft", thumbnail: "bg-purple-500/20", duration: "--:--", date: "1d ago" },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a]">
            <div className="p-8 max-w-7xl mx-auto space-y-10">

                {/* 1. Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        title="Available Credits"
                        value="1,250"
                        icon={Sparkles}
                        color="orange"
                        trend="+500"
                        trendUp={true}
                        description="added this month"
                    />
                    <StatsCard
                        title="Total Projects"
                        value="24"
                        icon={Video}
                        color="purple"
                        trend="+12%"
                        trendUp={true}
                        description="from last week"
                    />
                    <StatsCard
                        title="Minutes Generated"
                        value="142m"
                        icon={Clock}
                        color="blue"
                        description="Total video runtime"
                    />
                </div>

                {/* 2. Quick Actions */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Start Creating</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            onClick={onCreateNew}
                            className="group relative p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-white/[0.08] hover:border-orange-500/30 transition-all text-left overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-orange-500/20">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Create from Scratch</h3>
                                <p className="text-sm text-gray-400">Build your story scene by scene with full control over every detail.</p>
                            </div>
                        </button>

                        <button className="group p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all text-left">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-2">Script to Video</h3>
                            <p className="text-sm text-gray-400">Paste your script and let AI generate the storyboard and scenes instantly.</p>
                        </button>

                        <button className="group p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all text-left">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-2">Blog to Video</h3>
                            <p className="text-sm text-gray-400">Turn any blog post URL into an engaging video summary.</p>
                        </button>
                    </div>
                </section>

                {/* 3. Recent Projects */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                        <button className="text-sm text-gray-400 hover:text-white transition-colors">View All</button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-hidden text-sm">
                        {/* Header */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.08] text-gray-500 font-medium">
                            <div className="col-span-6">Project Name</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Duration</div>
                            <div className="col-span-2 text-right">Last Edited</div>
                        </div>

                        {/* Rows */}
                        {recentProjects.map((project) => (
                            <div key={project.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors border-b last:border-0 border-white/[0.05]">
                                <div className="col-span-6 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg ${project.thumbnail} flex items-center justify-center`}>
                                        <Film className="w-4 h-4 text-white/50" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{project.title}</h4>
                                        <span className="text-xs text-gray-500">{project.type}</span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium border",
                                        project.status === "Completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                            project.status === "Rendering" ? "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse" :
                                                "bg-gray-500/10 text-gray-400 border-gray-500/20"
                                    )}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="col-span-2 text-gray-400">
                                    {project.duration}
                                </div>
                                <div className="col-span-2 text-right text-gray-500">
                                    {project.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardHome;
