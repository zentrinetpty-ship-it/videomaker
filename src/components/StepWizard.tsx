'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, Loader2, Download, Video, Users } from 'lucide-react';
import type { APIKeys } from '@/types/workflow';

interface StepWizardProps {
    apiKeys: APIKeys;
}

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function StepWizard({ apiKeys }: StepWizardProps) {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [storyIdea, setStoryIdea] = useState('');
    const [generatedStory, setGeneratedStory] = useState('');
    const [storyboard, setStoryboard] = useState<any>(null);
    const [characters, setCharacters] = useState<any[]>([]);
    const [scenes, setScenes] = useState<any[]>([]);
    const [selectedSceneCount, setSelectedSceneCount] = useState(3);
    const [generatedVideos, setGeneratedVideos] = useState<any[]>([]);
    const [currentlyGenerating, setCurrentlyGenerating] = useState<number | null>(null);
    const [finalVideo, setFinalVideo] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const steps = [
        { number: 1, title: 'Story Idea', icon: '💡' },
        { number: 2, title: 'Generate Story', icon: '✨' },
        { number: 3, title: 'Storyboard', icon: '🗺️' },
        { number: 4, title: 'Generate Videos', icon: '🎬' },
        { number: 5, title: 'Final Video', icon: '📹' },
    ];

    const handleNext = async () => {
        setIsProcessing(true);

        try {
            if (currentStep === 1) {
                if (!apiKeys.geminiApiKey) {
                    alert('Please configure your Gemini API Key in Settings first.');
                    setIsProcessing(false);
                    return;
                }

                const response = await fetch('/api/generate-story', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prompt: storyIdea,
                        apiKey: apiKeys.geminiApiKey,
                        promptSettings: apiKeys.promptSettings,
                        geminiModel: apiKeys.geminiModel
                    })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to generate story');

                setGeneratedStory(data.story);
            } else if (currentStep === 2) {
                if (!apiKeys.geminiApiKey) {
                    alert('Please configure your Gemini API Key in Settings first.');
                    setIsProcessing(false);
                    return;
                }

                const response = await fetch('/api/generate-storyboard', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        story: generatedStory,
                        apiKey: apiKeys.geminiApiKey,
                        promptSettings: apiKeys.promptSettings,
                        geminiModel: apiKeys.geminiModel
                    })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to generate storyboard');

                setStoryboard(data);
                if (data.scenes) {
                    setScenes(data.scenes);
                    setSelectedSceneCount(Math.min(data.scenes.length, 5));
                }
            } else if (currentStep === 3) {
                await generateVideosSequentially();
            } else if (currentStep === 4) {
                setFinalVideo('final-video-url.mp4');
            }

            if (currentStep < 5) {
                setCurrentStep((currentStep + 1) as Step);
            }
        } catch (error: any) {
            console.error('Error in wizard step:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const generateVideosSequentially = async () => {
        const scenesToGenerate = scenes.slice(0, selectedSceneCount);
        const videos: any[] = [];

        for (let i = 0; i < scenesToGenerate.length; i++) {
            setCurrentlyGenerating(i);
            const scene = scenesToGenerate[i];

            try {
                const response = await fetch('/api/generate-video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sceneDescription: scene.description,
                        visualPrompt: scene.visual_prompt,
                        promptSettings: apiKeys.promptSettings,
                        sceneId: scene.id
                    })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to generate video');

                videos.push({
                    sceneId: scene.id,
                    videoUrl: data.videoUrl,
                    duration: data.duration || 5
                });

                setGeneratedVideos([...videos]);
            } catch (error: any) {
                console.error(`Error generating video for scene ${scene.id}:`, error);
                // Continue with next scene even if one fails
                videos.push({
                    sceneId: scene.id,
                    error: error.message,
                    videoUrl: null
                });
            }
        }

        setCurrentlyGenerating(null);
        setGeneratedVideos(videos);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as Step);
        }
    };

    return (
        <div className="h-full overflow-y-auto p-6">
            {/* Progress Bar */}
            <div className="max-w-5xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${currentStep >= step.number
                                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg'
                                        : 'bg-white/10 text-gray-400'
                                        }`}
                                >
                                    {currentStep > step.number ? (
                                        <Check className="w-6 h-6" />
                                    ) : (
                                        step.icon
                                    )}
                                </div>
                                <span className={`text-xs mt-2 font-medium ${currentStep >= step.number ? 'text-white' : 'text-gray-500'}`}>
                                    {step.title}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 rounded ${currentStep > step.number ? 'bg-orange-500' : 'bg-white/10'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-8 animate-fadeIn">
                    {/* Step 1: Story Idea */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Share Your Story Idea</h2>
                                <p className="text-gray-400">Tell us about the story you want to create. Be as detailed or brief as you like.</p>
                            </div>

                            <div>
                                <label className="label">What's your story about?</label>
                                <textarea
                                    className="input min-h-[200px] resize-none"
                                    placeholder="Example: A lonely robot discovers a hidden garden in a post-apocalyptic city and learns that nature can still thrive..."
                                    value={storyIdea}
                                    onChange={(e) => setStoryIdea(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-2">💡 Tip: Include characters, settings, and the main conflict for best results</p>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                <p className="text-sm text-blue-300">
                                    <strong>Examples:</strong> "A young girl finds a magical book that lets her visit different time periods" or "Two rival chefs must work together to save their restaurant"
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Generated Story */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Your Generated Story</h2>
                                <p className="text-gray-400">AI has created a beautiful narrative based on your idea</p>
                            </div>

                            <div className="p-6 rounded-xl bg-black/40 border border-white/[0.05]">
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{generatedStory}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                <Check className="w-5 h-5 text-green-400" />
                                <span className="text-sm text-green-300">Story generated successfully!</span>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Storyboard */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Storyboard Preview</h2>
                                <p className="text-gray-400">Your story broken down into cinematic scenes</p>
                            </div>

                            {/* Scene Count and Selector */}
                            <div className="card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-gray-400">Total Scenes Generated</p>
                                        <p className="text-3xl font-bold text-white">{scenes.length}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Selected for Video</p>
                                        <p className="text-3xl font-bold text-orange-500">{selectedSceneCount}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300">How many scenes do you want to generate into videos?</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max={scenes.length}
                                        value={selectedSceneCount}
                                        onChange={(e) => setSelectedSceneCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                    <p className="text-xs text-gray-500">Generating {selectedSceneCount} of {scenes.length} scenes</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {scenes.length > 0 ? scenes.map((scene) => (
                                    <div key={scene.id} className="card p-5 hover-lift">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                                {scene.id}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white mb-2">Scene {scene.id}</h3>
                                                <p className="text-sm text-gray-400">{scene.description}</p>
                                                <div className="flex gap-2 mt-3">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">Visual Prompt</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1 italic">{scene.visual_prompt}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-gray-400 text-center">No scenes generated yet.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Video Generation Progress */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">🎬 Generating Videos</h2>
                                <p className="text-gray-400">
                                    {currentlyGenerating !== null
                                        ? `Generating scene ${currentlyGenerating + 1} of ${selectedSceneCount}...`
                                        : `${generatedVideos.length} of ${selectedSceneCount} videos complete`
                                    }
                                </p>
                            </div>

                            <div className="space-y-4">
                                {scenes.slice(0, selectedSceneCount).map((scene, index) => {
                                    const video = generatedVideos.find(v => v.sceneId === scene.id);
                                    const isGenerating = currentlyGenerating === index;
                                    const isComplete = video && !video.error;
                                    const hasFailed = video && video.error;

                                    return (
                                        <div key={scene.id} className="card p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                                                    {isComplete ? (
                                                        <Check className="w-8 h-8 text-green-400" />
                                                    ) : isGenerating ? (
                                                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                                                    ) : (
                                                        <Video className="w-8 h-8 text-white/50" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-white mb-1">Scene {scene.id}: {scene.description.substring(0, 50)}...</h3>
                                                    <p className="text-sm text-gray-400">
                                                        {isComplete && '✅ Complete'}
                                                        {isGenerating && '⏳ Generating...'}
                                                        {!isComplete && !isGenerating && !hasFailed && '⏸️ Waiting'}
                                                        {hasFailed && `❌ Failed: ${video.error}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Overall Progress */}
                            <div className="card p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Overall Progress</span>
                                    <span className="text-sm font-semibold text-white">
                                        {Math.round((generatedVideos.length / selectedSceneCount) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${(generatedVideos.length / selectedSceneCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Final Video */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Video Scenes</h2>
                                <p className="text-gray-400">AI-generated video clips for each scene</p>
                            </div>

                            <div className="space-y-4">
                                {scenes.length > 0 ? scenes.map((scene) => (
                                    <div key={scene.id} className="card p-5 hover-lift">
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                                                <Video className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white mb-1">Scene {scene.id} Video</h3>
                                                <p className="text-sm text-gray-400">Ready to generate</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <span className="text-sm">Pending</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-gray-400 text-center">No scenes available.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 6: Final Video */}
                    {currentStep === 6 && (
                        <div className="space-y-6 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-4">
                                <Check className="w-10 h-10 text-white" />
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">🎉 Your Video is Ready!</h2>
                                <p className="text-gray-400">Your AI-generated story video has been created successfully</p>
                            </div>

                            <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                <div className="text-center">
                                    <Video className="w-16 h-16 text-gray-500 mx-auto mb-3" />
                                    <p className="text-gray-400">Video preview will appear here</p>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button className="btn btn-primary text-lg">
                                    <Download className="w-5 h-5" />
                                    Download Video
                                </button>
                                <button className="btn btn-secondary text-lg" onClick={() => {
                                    setCurrentStep(1);
                                    setStoryIdea('');
                                }}>
                                    Create Another
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {currentStep < 5 && (
                        <div className="flex justify-between mt-8 pt-6 border-t border-white/[0.08]">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="btn btn-secondary"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={(currentStep === 1 && !storyIdea.trim()) || isProcessing}
                                className="btn btn-primary"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : currentStep === 3 ? (
                                    <>
                                        Generate {selectedSceneCount} Video{selectedSceneCount > 1 ? 's' : ''}
                                        <Sparkles className="w-4 h-4" />
                                    </>
                                ) : currentStep === 4 ? (
                                    <>
                                        Finalize Video
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Next Step
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
