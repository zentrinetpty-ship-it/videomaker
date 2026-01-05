import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, GENERATION_CONFIG, SAFETY_SETTINGS } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const { story, apiKey, promptSettings, geminiModel } = await req.json();

        if (!apiKey) {
            return NextResponse.json({ error: "API Key is required" }, { status: 401 });
        }

        if (!story) {
            return NextResponse.json({ error: "Story content is required" }, { status: 400 });
        }

        const client = getGeminiClient(apiKey);
        // Using Pro model for better reasoning and JSON structuring
        const model = client.getGenerativeModel({
            model: geminiModel || "gemini-1.5-pro-latest",
            generationConfig: {
                ...GENERATION_CONFIG,
                responseMimeType: "application/json"
            },
            safetySettings: SAFETY_SETTINGS
        });

        // Build custom style modifiers
        let styleModifiers = '';
        if (promptSettings?.globalModifier) {
            styleModifiers += `\nGlobal Style: ${promptSettings.globalModifier}`;
        }
        if (promptSettings?.visualStyle) {
            styleModifiers += `\nVisual Style: ${promptSettings.visualStyle}`;
        }

        const systemPrompt = `
      You are an expert storyboard artist and director.
      Your task is to break down the provided story into a sequence of cinematic scenes.
      ${styleModifiers}
      
      For each scene, provide:
      1. id: scene number
      2. description: what happens in the scene (narrative)
      3. visual_prompt: a highly detailed image generation prompt optimizing for cinematic lighting, composition, and style.
      
      Return a JSON object with this structure:
      {
        "scenes": [
          { "id": 1, "description": "...", "visual_prompt": "..." }
        ]
      }
    `;

        const fullPrompt = `${systemPrompt}\n\nStory:\n${story}`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON to ensure validity
        const storyboard = JSON.parse(text);

        return NextResponse.json(storyboard);

    } catch (error: any) {
        console.error("Error generating storyboard:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate storyboard" },
            { status: 500 }
        );
    }
}
