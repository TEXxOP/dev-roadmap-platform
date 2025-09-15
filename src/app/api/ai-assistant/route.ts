import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
    try {
        const { message, context = "general" } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY not found in environment variables");
            return NextResponse.json(
                { error: "AI service not configured" },
                { status: 500 }
            );
        }

        console.log("Gemini API Key available:", !!apiKey);
        console.log("API Key length:", apiKey?.length);
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        console.log("Gemini model initialized successfully");

        // Create system prompt based on context
        let systemPrompt = "";
        
        switch (context) {
            case "roadmap":
                systemPrompt = `You are an AI assistant for the Dev Roadmap Platform created by Harish Saini. 
                Help users with roadmap-related questions, learning paths, skill development, and career guidance in programming and technology. 
                Be encouraging, provide specific actionable advice, and reference relevant learning resources when possible.`;
                break;
            case "interview":
                systemPrompt = `You are an AI assistant for the Dev Roadmap Platform's interview preparation system. 
                Help users with interview preparation, technical questions, coding challenges, and career advice. 
                Provide detailed explanations, examples, and tips for technical interviews.`;
                break;
            case "blog":
                systemPrompt = `You are an AI assistant helping users with blog writing and content creation on the Dev Roadmap Platform. 
                Assist with writing tips, technical content ideas, blog structure, and publishing guidance.`;
                break;
            case "general":
            default:
                systemPrompt = `You are an AI assistant for the Dev Roadmap Platform, a comprehensive learning ecosystem created by Harish Saini. 
                The platform offers interactive roadmaps, AI-powered interview practice, blog platform, progress tracking, and certification system. 
                Help users with any questions about the platform, programming, career development, or technical topics. 
                Be helpful, encouraging, and provide specific actionable advice.`;
        }

        const prompt = `${systemPrompt}\n\nUser Question: ${message}\n\nPlease provide a helpful and detailed response:`;
        
        console.log("Sending prompt to Gemini, length:", prompt.length);
        console.log("Context:", context);

        const result = await model.generateContent(prompt);
        console.log("Gemini API call successful");
        
        const response = result.response;
        const text = response.text();
        
        console.log("Response received, length:", text.length);

        return NextResponse.json({
            success: true,
            response: text,
            context: context
        });

    } catch (error: any) {
        console.error("AI Assistant error:", error.message);
        console.error("Stack trace:", error.stack);
        
        // Handle specific Gemini API errors
        if (error.message?.includes('API_KEY')) {
            return NextResponse.json(
                { error: "Invalid API key configuration" },
                { status: 500 }
            );
        }
        
        if (error.message?.includes('quota')) {
            return NextResponse.json(
                { error: "AI service quota exceeded. Please try again later." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Failed to get AI response. Please try again." },
            { status: 500 }
        );
    }
}