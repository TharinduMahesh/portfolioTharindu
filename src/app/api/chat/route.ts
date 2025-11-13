  // src/app/api/chat/route.ts
  import { GoogleGenAI } from '@google/genai';
  import { NextResponse } from 'next/server';

  // Initialize Gemini with your API key
  // MAKE SURE YOU REGENERATE THIS KEY IF YOU EXPOSED IT!
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

  // --- SYSTEM INSTRUCTION ---
  const systemInstruction = `You are MaheshBot, a friendly and highly skilled AI assistant embedded in the developer portfolio of Tharindu Mahesh. Your primary role is to answer questions 
  about his professional background using the following provided data.

  RULES:
  1. Always maintain a professional, enthusiastic, and encouraging tone.
  2. Be concise and directly address the user's question using the profile data below.
  3. If a question is entirely unrelated to Tharindu Mahesh or the provided data, politely state that you can only answer questions about his professional profile (e.g., "I apologize, but I can only answer questions related to Tharindu Mahesh's professional profile.").

  --- THARINDU MAHESH'S PROFILE DATA ---
  Name: Tharindu Mahesh
  Role: Software Engineering Intern
  Contact: +94 76 326 6155 | tharindumaheshk@gmail.com
  Location: Eliphangamuwa, Tholangamuwa, Warakapola
  LinkedIn: linkedin.com/tharindu-mahesh
  GitHub: github.com/tharindu-mahesh
  HackerRank: hackerrank.com/tharindu-mahesh

  SUMMARY: Third-year IT undergraduate, highly committed to creating innovative solutions for societal change. Responsible team player with friendly leadership qualities. Seeking a Software Engineer Intern opportunity.

  CORE INTERESTS: AI/ML related technologies, including deep learning, natural language processing (NLP), and computer vision.

  TECHNICAL SKILLS:
  - PROGRAMMING LANGUAGES: Java, C, C#, C++, Python
  - WEB DEVELOPMENT: Angular, NodeJs, HTML, CSS, Javascript
  - DATABASE: MSSQL, MySQL, MongoDB
  - TOOLS/IDE: VS Code, IntelliJ, CLion, Visual Studio, Figma, PyTorch
  - VERSION CONTROL: Git (GitHub)
  - SOFT SKILLS: Problem Solving, Leadership, Time Management, Teamwork, Effective Communication, Critical Thinking

  EDUCATION:
  - University of Moratuwa: B.Sc.(Hons) in Information Technology (2023 - PRESENT). CGPA: 3.36.
  - Kegalu Maha Vidyalaya, Kegalle: GCE Advanced Level - 2020 (Physical Science Stream). Results: 3Bs, Z-Score: 1.6734, District Rank: 82.

  PROJECTS:
  1. Tea Factory Supply Chain Management System (2025 - Group Project Leader): Full-stack system using Angular, ASP.net, MSSQL, Azure. Features role-based auth and a dynamic Supplier Payment & Incentive system.
  2. Automated Water Tank Cleaning System (2024 - Group Hardware Project): Microcontroller-based prototype using C++, Schematic Design (EasyEDA). Features real-time water quality monitoring, Nema 17 stepper motors, and custom firmware for autonomous triggering.
  3. Personal Developer Portfolio (2025 - Individual Project): Full-stack site using Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Resend. Showcases projects; includes a contact form and modern UI/UX.
  4. Transformer Model from Scratch (Individual AI/ML Project): Coded a Transformer model using PyTorch and Python. Involved attention visualization and focused on NLP fundamentals. Included a Shakespeare Text Converter application.
  5. Other AI/ML Focused Projects: Includes an Image Processing project, a Text Classification project (RNN), and a Medical Chatbot implementation.`;

  // Convert incoming messages to Gemini format
  const convertMessagesToGemini = (messages: any[]) => {
    return messages.map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    }));
  };

  export async function POST(req: Request) {
    try {
      const { messages } = await req.json();

      // 1. Combine the RAG context and the conversation history into the contents array
      const contents = [
        // Inject RAG context as the *first* message from the 'user' (acting as the system)
        // This is the most stable way to handle RAG prompts in non-streaming.
        { role: "user", parts: [{ text: systemInstruction }] }, 
        
        // Then append the actual conversation history
        ...convertMessagesToGemini(messages.slice(1)), // Exclude the very first user message which is replaced by the RAG prompt
      ];
      
      // Check if the first message in the history is the user's first query; if so, include it
      if (messages.length === 1) {
          contents.push(convertMessagesToGemini(messages)[0]);
      }
      
      // 2. Call the model without the 'systemInstruction' in config
      const response: any = await ai.models.generateContent({
          model: "gemini-2.5-flash", 
          contents: contents, // The RAG context is now here
          config: {
              // REMOVED: systemInstruction: {...}
              temperature: 0.2, 
          }
      });

      let aiTextContent = response.text; 

      if (!aiTextContent) {
          console.error("Gemini returned no text. Response:", JSON.stringify(response, null, 2));
          return NextResponse.json({ error: "AI returned no text content." }, { status: 500 });
      }
      
      return NextResponse.json({ text: aiTextContent }, { status: 200 });

    } catch (error) {
      // This will print the actual technical error to your terminal
      console.error("[CRITICAL GEMINI EXECUTION ERROR]", error);
      return NextResponse.json({ error: "API returned a critical internal error. Check terminal logs." }, { status: 500 });
    }
  }