import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/imagen";

export async function POST(req: NextRequest) {
    try {
        const { prompt, projectId, location, accessToken, aspectRatio } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // For now, we'll return a placeholder since Vertex AI requires OAuth2 setup
        // This would need proper Google Cloud authentication in production
        if (!projectId || !location || !accessToken) {
            return NextResponse.json(
                {
                    error: "Vertex AI configuration incomplete",
                    message: "Image generation requires Project ID, Location, and Access Token. This feature is coming soon.",
                    placeholder: true
                },
                { status: 501 } // Not Implemented
            );
        }

        const result = await generateImage(
            { projectId, location, accessToken },
            {
                prompt,
                aspectRatio: aspectRatio || '16:9',
                numberOfImages: 1,
                safetyFilterLevel: 'block_some'
            }
        );

        // Return the first generated image
        const image = result.images[0];

        return NextResponse.json({
            imageData: image.bytesBase64Encoded,
            mimeType: image.mimeType,
        });

    } catch (error: any) {
        console.error("Error generating image:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate image" },
            { status: 500 }
        );
    }
}
