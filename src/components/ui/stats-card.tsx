import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    description?: string;
    color?: "orange" | "purple" | "blue" | "green";
}

const StatsCard = ({ title, value, icon: Icon, trend, trendUp, description, color = "blue" }: StatsCardProps) => {

    const colorStyles = {
        orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
        purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        green: "text-green-500 bg-green-500/10 border-green-500/20",
    };

    return (
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.12] transition-all hover:-translate-y-1 group">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
                </div>
                <div className={cn("p-2 rounded-lg", colorStyles[color])}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            {(trend || description) && (
                <div className="flex items-center gap-2 text-xs">
                    {trend && (
                        <span className={cn("font-medium px-1.5 py-0.5 rounded",
                            trendUp ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
                        )}>
                            {trend}
                        </span>
                    )}
                    {description && (
                        <span className="text-gray-500">{description}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatsCard;
