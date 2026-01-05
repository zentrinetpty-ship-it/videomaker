'use client';

import { Lightbulb, Sparkles, Map, Users, Video, Package } from 'lucide-react';

const nodeTypes = [
    {
        id: 'storyIdea',
        label: 'Story Idea',
        icon: Lightbulb,
        description: 'Input your story concept',
        color: '#ff6b6b',
    },
    {
        id: 'storyGenerator',
        label: 'Story Generator',
        icon: Sparkles,
        description: 'Generate full story with AI',
        color: '#4ecdc4',
    },
    {
        id: 'storyboard',
        label: 'Storyboard',
        icon: Map,
        description: 'Break story into scenes',
        color: '#45b7d1',
    },
    {
        id: 'characterGen',
        label: 'Character Generator',
        icon: Users,
        description: 'Create character images',
        color: '#f9ca24',
    },
    {
        id: 'sceneGen',
        label: 'Scene Generator',
        icon: Video,
        description: 'Generate video clips',
        color: '#6c5ce7',
    },
    {
        id: 'videoRenderer',
        label: 'Video Renderer',
        icon: Package,
        description: 'Compile final video',
        color: '#00b894',
    },
];

export default function Sidebar() {
    return (
        <aside className="w-72 border-r border-white/[0.08] backdrop-blur-xl bg-black/30 overflow-y-auto">
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Workflow Nodes
                    </h3>
                    <p className="text-xs text-gray-500">
                        Drag nodes to customize your pipeline
                    </p>
                </div>

                {/* Nodes */}
                <div className="space-y-3">
                    {nodeTypes.map((node, index) => {
                        const Icon = node.icon;
                        return (
                            <div
                                key={node.id}
                                className="card hover-lift cursor-move p-4 group relative overflow-hidden animate-slideInLeft"
                                style={{ animationDelay: `${index * 50}ms` }}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('application/reactflow', node.id);
                                    e.dataTransfer.effectAllowed = 'move';
                                }}
                            >
                                {/* Gradient background on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${node.color}, ${node.color}dd)`,
                                    }}
                                />

                                <div className="relative flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                                        style={{
                                            background: `linear-gradient(135deg, ${node.color}, ${node.color}dd)`,
                                        }}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                                            {node.label}
                                        </div>
                                        <div className="text-xs text-gray-400 truncate">
                                            {node.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Help Card */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                    <div className="flex items-start gap-2">
                        <div className="text-lg">💡</div>
                        <div>
                            <p className="text-xs font-medium text-orange-300 mb-1">
                                Quick Tip
                            </p>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Click <strong>Execute Workflow</strong> to run all nodes automatically in sequence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
