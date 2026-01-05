'use client';

import { X, Key, Cloud, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { APIKeys } from '@/types/workflow';

interface SettingsModalProps {
    apiKeys: APIKeys;
    onSave: (keys: APIKeys) => void;
    onClose: () => void;
}

export default function SettingsModal({ apiKeys, onSave, onClose }: SettingsModalProps) {
    const [formData, setFormData] = useState<APIKeys>(apiKeys);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative glass rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <Key className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">API Configuration</h2>
                            <p className="text-sm text-gray-400">Configure your Google Cloud credentials</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn btn-ghost p-2">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Gemini API Key */}
                    <div className="card">
                        <div className="flex items-start gap-3 mb-4">
                            <Cloud className="w-5 h-5 text-orange-500 mt-1" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">Gemini API Key</h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    Required for story generation and storyboard creation.{' '}
                                    <a
                                        href="https://ai.google.dev/gemini-api/docs/api-key"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-500 hover:underline"
                                    >
                                        Get your API key →
                                    </a>
                                </p>
                                <input
                                    type="password"
                                    placeholder="AIza..."
                                    className="input"
                                    value={formData.geminiApiKey}
                                    onChange={(e) =>
                                        setFormData({ ...formData, geminiApiKey: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Prompt Customization */}
                    <div className="card">
                        <div className="flex items-start gap-3 mb-4">
                            <Sparkles className="w-5 h-5 text-orange-500 mt-1" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">Prompt Customization</h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    Customize the AI generation style for all steps
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

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1 block">Global Style Modifier (All Steps)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 3D animated style, Pixar-like quality"
                                            className="input text-sm"
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
                                        <label className="text-xs text-gray-400 mb-1 block">Story Generation Style</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Whimsical, family-friendly tone"
                                            className="input text-sm"
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
                                        <label className="text-xs text-gray-400 mb-1 block">Visual Description Style</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Cinematic camera angles, vibrant colors"
                                            className="input text-sm"
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
                                        <label className="text-xs text-gray-400 mb-1 block">Image Generation Style</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 3D render, high quality, vibrant"
                                            className="input text-sm"
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
                    </div>

                    {/* Vertex AI (Optional) */}
                    <div className="card opacity-60">
                        <div className="flex items-start gap-3 mb-4">
                            <Cloud className="w-5 h-5 text-blue-500 mt-1" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">
                                    Vertex AI Credentials{' '}
                                    <span className="text-xs text-gray-500">(Optional - Coming Soon)</span>
                                </h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    For Imagen 3 and Veos video generation. Currently in development.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Project ID"
                                        className="input"
                                        value={formData.vertexProjectId || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, vertexProjectId: e.target.value })
                                        }
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location (e.g., us-central1)"
                                        className="input"
                                        value={formData.vertexLocation || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, vertexLocation: e.target.value })
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-300">
                            💡 <strong>Note:</strong> Your API keys are stored locally in your browser and never sent to any server except Google's APIs.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
