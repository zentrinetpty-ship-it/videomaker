import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, GENERATION_CONFIG, SAFETY_SETTINGS } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const { prompt, genre, tone, apiKey, promptSettings } = await req.json();

        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key is required" },
                { status: 401 }
            );
        }

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const client = getGeminiClient(apiKey);
        const model = client.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS
        });

        // Build custom style modifiers
        let styleModifiers = '';
        if (promptSettings?.globalModifier) {
            styleModifiers += `\nGlobal Style: ${promptSettings.globalModifier}`;
        }
        if (promptSettings?.storyStyle) {
            styleModifiers += `\nStory Style: ${promptSettings.storyStyle}`;
        }

        const systemPrompt = `
      You are an expert storyteller and screenwriter. 
      Your task is to write a compelling short story based on the user's idea.
      
      Genre: ${genre || 'General'}
      Tone: ${tone || 'Neutral'}
      ${styleModifiers}
      
      Structure the story clearly. It should be suitable for adaptation into a short video (approx 30-60 seconds).
      Focus on visual descriptions and strong narrative flow.
    `;

        const fullPrompt = `${systemPrompt}\n\nUser Idea: ${prompt}`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const story = response.text();

        return NextResponse.json({ story });

    } catch (error: any) {
        console.error("Error generating story:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate story" },
            { status: 500 }
        );
    }
}
