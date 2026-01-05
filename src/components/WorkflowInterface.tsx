'use client';

import { useState } from 'react';
import { Settings, Sparkles, Home, X } from 'lucide-react';
import StepWizard from '@/components/StepWizard';
import SettingsModal from '@/components/SettingsModal';
import type { APIKeys } from '@/types/workflow';

interface WorkflowInterfaceProps {
    onExit?: () => void;
}

export default function WorkflowInterface({ onExit }: WorkflowInterfaceProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [apiKeys, setApiKeys] = useState<APIKeys>({
        geminiApiKey: '',
    });

    // Check if API keys are configured
    const hasApiKeys = apiKeys.geminiApiKey.trim().length > 0;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0d0d0d] relative">
            {/* Ambient background effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Top Bar */}
            <header className="relative z-10 h-16 border-b border-white/[0.08] backdrop-blur-xl bg-black/30 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6d5a] to-[#e55a48] flex items-center justify-center shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">AI Story Studio</h1>
                        <p className="text-xs text-gray-400">Create Amazing Stories</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {onExit && (
                        <button onClick={onExit} className="btn btn-ghost">
                            <Home className="w-4 h-4" />
                            Home
                        </button>
                    )}
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="btn btn-secondary"
                    >
                        <Settings className="w-4 h-4" />
                        API Settings
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-10 flex-1">
                {!hasApiKeys ? (
                    // Show API key setup prompt
                    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
                        <div className="max-w-md w-full card glass-hover p-8 text-center animate-scaleIn">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                                <Settings className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Almost Ready!</h2>
                            <p className="text-gray-400 mb-6">
                                Please configure your API keys to start creating amazing AI-powered stories
                            </p>
                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                className="btn btn-primary w-full text-lg"
                            >
                                <Settings className="w-5 h-5" />
                                Configure API Keys
                            </button>
                            <p className="text-xs text-gray-500 mt-4">
                                You'll need a Google Gemini API key to get started
                            </p>
                        </div>
                    </div>
                ) : (
                    // Show the step wizard
                    <StepWizard apiKeys={apiKeys} />
                )}
            </div>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <SettingsModal
                    apiKeys={apiKeys}
                    onSave={(keys) => {
                        setApiKeys(keys);
                        setIsSettingsOpen(false);
                    }}
                    onClose={() => setIsSettingsOpen(false)}
                />
            )}
        </div>
    );
}
