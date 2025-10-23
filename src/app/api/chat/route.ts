// // src/app/api/chat/route.ts
// import { GoogleGenAI } from '@google/genai';
// import { Message, StreamingTextResponse } from 'ai'; 
// import { GoogleGenerativeAIStream } from 'ai/streams';
// import { THARINDU_KNOWLEDGE } from '@/data/tharindu_cv_knowledge'; // Adjust alias if necessary

// // Initialize the GoogleGenAI client (it automatically uses the GEMINI_API_KEY env var)
// const ai = new GoogleGenAI({});

// // Define the RAG System Prompt
// const RAG_SYSTEM_PROMPT = `
// You are Tharindu Mahesh's highly specialized AI assistant for his professional portfolio. Your persona is professional, friendly, and enthusiastic about Software Engineering and AI/ML.

// 1. IDENTITY: You are an AI created by Tharindu.
// 2. CONTEXT: You MUST answer questions based ONLY on the following knowledge base.
// 3. REFUSAL: If the question cannot be answered with the provided data, politely state: "I only have access to the data in Tharindu's portfolio, and I don't see that specific detail here. Feel free to ask about his projects, skills, or AI interests!"
// 4. EMPHASIS: When asked about AI, Machine Learning, or related projects, make sure to highlight his specific skills (Image Processing, Text Classification, Medical Chatbot).

// --- KNOWLEDGE BASE ---
// ${THARINDU_KNOWLEDGE}
// --- END OF KNOWLEDGE BASE ---
// `;

// // NOTE: Removed the toGeminiMessages function. 
// // The GoogleGenerativeAIStream handler automatically converts Vercel AI SDK messages 
// // (role: 'user'/'assistant') into the required Gemini structure (role: 'user'/'model').

// export const runtime = 'edge'; // Use the Vercel Edge runtime for speed

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json() as { messages: Message[] }; // Cast for type safety

//     const response = await ai.models.generateContentStream({
//         model: 'gemini-2.5-flash', // Fast and performant model for this task
//         contents: messages, // Pass the Vercel AI SDK messages directly
//         config: {
//             systemInstruction: RAG_SYSTEM_PROMPT, // Inject the RAG prompt here
//             // Optional: Controls randomness. Lower is more factual.
//             temperature: 0.2, 
//         },
//     });

//     // Convert the Gemini stream to a Vercel AI SDK stream
//     const stream = GoogleGenerativeAIStream(response);

//     // Return the stream
//     return new StreamingTextResponse(stream);

//   } catch (error) {
//     console.error("Gemini AI Chat API Error:", error);
//     // Return a structured error response
//     return new Response(JSON.stringify({ 
//         error: true, 
//         message: 'The AI assistant encountered an error. Please check the server logs.' 
//     }), { 
//         status: 500,
//         headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }