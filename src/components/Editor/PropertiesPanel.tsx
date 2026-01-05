'use client';

import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface PropertiesPanelProps {
    selectedNodeId: string | null;
}

export default function PropertiesPanel({ selectedNodeId }: PropertiesPanelProps) {
    if (!selectedNodeId) {
        return (
            <aside className="w-80 border-l border-white/[0.08] backdrop-blur-xl bg-black/30 p-6">
                <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">No Node Selected</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                        Click on a workflow node to view its configuration and output
                    </p>
                </div>
            </aside>
        );
    }

    // Mock data - will be replaced with real node data
    const mockNode = {
        label: 'Story Idea',
        status: 'completed' as const,
        output: 'A lonely robot discovers a hidden garden in a post-apocalyptic city...',
    };

    const statusIcons = {
        pending: Clock,
        running: Clock,
        completed: CheckCircle2,
        error: AlertCircle,
    };

    const StatusIcon = statusIcons[mockNode.status];

    return (
        <aside className="w-80 border-l border-white/[0.08] backdrop-blur-xl bg-black/30 overflow-y-auto">
            <div className="p-6 space-y-6 animate-slideInRight">
                {/* Header */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-3">{mockNode.label}</h3>
                    <div className={`status-badge status-${mockNode.status}`}>
                        <StatusIcon className="w-3 h-3 animate-spin" />
                        {mockNode.status.charAt(0).toUpperCase() + mockNode.status.slice(1)}
                    </div>
                </div>

                {/* Configuration Section */}
                <div className="card hover-lift">
                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-orange-500 to-purple-500 rounded-full" />
                        Configuration
                    </h4>
                    <div className="space-y-4">
                        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                            <label className="label mb-1">Node Type</label>
                            <div className="text-sm text-gray-300">Story Idea Input</div>
                        </div>
                        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                            <label className="label mb-1">Status</label>
                            <div className="text-sm text-gray-300 capitalize">{mockNode.status}</div>
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                {mockNode.output && (
                    <div className="card hover-lift">
                        <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-green-500 rounded-full" />
                            Output
                        </h4>
                        <div className="p-4 rounded-lg bg-black/40 border border-white/[0.05]">
                            <p className="text-sm text-gray-300 leading-relaxed">{mockNode.output}</p>
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-2">
                        <div className="text-lg">ℹ️</div>
                        <p className="text-xs text-blue-300 leading-relaxed">
                            This panel displays the current configuration and output of the selected workflow node.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
