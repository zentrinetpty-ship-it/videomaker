'use client';

import { X, Key, Cloud, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { APIKeys } from '@/types/workflow';

interface SettingsModalProps {
    apiKeys: APIKeys;
    onSave: (keys: APIKeys) => void;
    onClose: () => void;
}

type TabType = 'api-keys' | 'prompts' | 'vertex-ai';

export default function SettingsModal({ apiKeys, onSave, onClose }: SettingsModalProps) {
    const [formData, setFormData] = useState<APIKeys>(apiKeys);
    const [activeTab, setActiveTab] = useState<TabType>('api-keys');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const tabs = [
        { id: 'api-keys' as TabType, label: 'API Keys', icon: Key },
        { id: 'prompts' as TabType, label: 'Prompt Customization', icon: Sparkles },
        { id: 'vertex-ai' as TabType, label: 'Vertex AI', icon: Cloud },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative glass rounded-2xl max-w-3xl w-full shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <Key className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Settings</h2>
                            <p className="text-sm text-gray-400">Configure your AI Story Studio</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn btn-ghost p-2">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 px-6 pt-4 border-b border-white/[0.08]">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${isActive
                                    ? 'bg-white/[0.08] text-white border-b-2 border-purple-500'
                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* API Keys Tab */}
                        {activeTab === 'api-keys' && (
                            <div className="space-y-6">
                                <div className="card">
                                    <div className="flex items-start gap-3 mb-4">
                                        <Key className="w-5 h-5 text-purple-500 mt-1" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-1">Gemini API Key</h3>
                                            <p className="text-sm text-gray-400 mb-3">
                                                Required for story and storyboard generation
                                            </p>
                                            <input
                                                type="password"
                                                placeholder="AIza..."
                                                className="input"
                                                value={formData.geminiApiKey}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, geminiApiKey: e.target.value })
                                                }
                                            />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Get your API key from{' '}
                                                <a
                                                    href="https://aistudio.google.com/apikey"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-purple-400 hover:text-purple-300"
                                                >
                                                    Google AI Studio
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="flex items-start gap-3 mb-4">
                                        <Sparkles className="w-5 h-5 text-blue-500 mt-1" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-1">Gemini Model</h3>
                                            <p className="text-sm text-gray-400 mb-3">
                                                Select which Gemini model to use
                                            </p>
                                            <select
                                                className="input"
                                                value={formData.geminiModel || 'gemini-1.5-flash-latest'}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, geminiModel: e.target.value })
                                                }
                                            >
                                                <option value="gemini-1.5-flash-latest">Gemini 1.5 Flash (Latest)</option>
                                                <option value="gemini-1.5-pro-latest">Gemini 1.5 Pro (Latest)</option>
                                                <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Experimental)</option>
                                                <option value="gemini-pro">Gemini Pro (Legacy)</option>
                                                <option value="gemini-pro-vision">Gemini Pro Vision (Legacy)</option>
                                            </select>
                                            <p className="text-xs text-gray-500 mt-2">
                                                💡 Use "Latest" versions for best compatibility
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                    <p className="text-sm text-blue-300">
                                        <strong>💡 Tip:</strong> Your API key is stored locally in your browser and never sent to our servers.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Prompt Customization Tab */}
                        {activeTab === 'prompts' && (
                            <div className="space-y-6">
                                <div className="card">
                                    <div className="flex items-start gap-3 mb-4">
                                        <Sparkles className="w-5 h-5 text-orange-500 mt-1" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-1">Style Presets</h3>
                                            <p className="text-sm text-gray-400 mb-3">
                                                Quick-select common generation styles
                                            </p>

                                            {/* Presets */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        promptSettings: {
                                                            globalModifier: '3D animated style, Pixar-like quality, vibrant colors',
                                                            storyStyle: 'Whimsical, family-friendly tone',
                                                            visualStyle: 'Cinematic 3D animation, dynamic camera angles',
                                                            imageStyle: '3D render, Pixar style, high quality'
                                                        }
                                                    })}
                                                    className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition"
                                                >
                                                    🎬 3D Animation
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        promptSettings: {
                                                            globalModifier: 'Photorealistic, cinematic quality',
                                                            storyStyle: 'Dramatic, mature tone',
                                                            visualStyle: 'Realistic cinematography, professional lighting',
                                                            imageStyle: 'Photorealistic, 4K quality, cinematic'
                                                        }
                                                    })}
                                                    className="text-xs px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                                                >
                                                    📷 Realistic
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        promptSettings: {
                                                            globalModifier: 'Anime art style, vibrant colors',
                                                            storyStyle: 'Energetic, expressive tone',
                                                            visualStyle: 'Anime-style scenes, dynamic compositions',
                                                            imageStyle: 'Anime art, cel-shaded, vibrant'
                                                        }
                                                    })}
                                                    className="text-xs px-3 py-1.5 rounded-full bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 transition"
                                                >
                                                    🎨 Anime
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h3 className="font-semibold text-white mb-4">Custom Style Modifiers</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-300 mb-2 block">
                                                Global Style Modifier
                                                <span className="text-xs text-gray-500 ml-2">(Applied to all steps)</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., 3D animated style, Pixar-like quality"
                                                className="input"
                                                value={formData.promptSettings?.globalModifier || ''}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        promptSettings: {
                                                            ...formData.promptSettings,
                                                            globalModifier: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-300 mb-2 block">Story Generation Style</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Whimsical, family-friendly tone"
                                                className="input"
                                                value={formData.promptSettings?.storyStyle || ''}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        promptSettings: {
                                                            ...formData.promptSettings,
                                                            storyStyle: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-300 mb-2 block">Visual Description Style</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Cinematic camera angles, vibrant colors"
                                                className="input"
                                                value={formData.promptSettings?.visualStyle || ''}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        promptSettings: {
                                                            ...formData.promptSettings,
                                                            visualStyle: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-300 mb-2 block">Image Generation Style</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., 3D render, high quality, vibrant"
                                                className="input"
                                                value={formData.promptSettings?.imageStyle || ''}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        promptSettings: {
                                                            ...formData.promptSettings,
                                                            imageStyle: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vertex AI Tab */}
                        {activeTab === 'vertex-ai' && (
                            <div className="space-y-6">
                                <div className="card opacity-60">
                                    <div className="flex items-start gap-3 mb-4">
                                        <Cloud className="w-5 h-5 text-blue-500 mt-1" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-1">Vertex AI Configuration</h3>
                                            <p className="text-sm text-gray-400 mb-3">
                                                Optional: For Imagen 3 image generation
                                            </p>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-xs text-gray-400 mb-1 block">Project ID</label>
                                                    <input
                                                        type="text"
                                                        placeholder="my-project-id"
                                                        className="input text-sm"
                                                        value={formData.vertexProjectId || ''}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, vertexProjectId: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-gray-400 mb-1 block">Location</label>
                                                    <input
                                                        type="text"
                                                        placeholder="us-central1"
                                                        className="input text-sm"
                                                        value={formData.vertexLocation || ''}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, vertexLocation: e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                                    <p className="text-sm text-yellow-300">
                                        <strong>⚠️ Note:</strong> Vertex AI requires OAuth2 authentication. This feature is currently in development.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-6 border-t border-white/[0.08] bg-black/20">
                        <button type="button" onClick={onClose} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
