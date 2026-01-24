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
  Role: IT Undergraduate
  Contact: +94 76 326 6155 | tharindumaheshk@gmail.com
  Location: Eliphangamuwa, Tholangamuwa
  LinkedIn: linkedin.com/tharindu-mahesh
  GitHub: github.com/tharindu-mahesh

  ABOUT ME: 
  Third-year undergraduate pursuing a BSc (Hons) in Information Technology at the University of Moratuwa, with experience in developing efficient and scalable applications. Skilled in IT, AI, and ML technologies, with a strong foundation in programming and system design. A team player with strong problem-solving skills, able to perform well under pressure and deliver high-quality results. Motivated to apply technical knowledge to make a real impact in the industry.

  EDUCATION:
  - University of Moratuwa: B.Sc.(Hons) in Information Technology (2023 - PRESENT). GPA: 3.47
  - Kegalu Vidyalaya, Kegalle: GCE A/L - 2021 (Physical Science Stream). Combined Mathematics: B, Physics: B, Chemistry: B. Z-Score: 1.657.

  TECHNICAL SKILLS:
  - AI/ML: RAG, FAISS, LangChain, LangGraph, LLMs, CNNs, RNN/LSTM
  - BACKEND: Python, FastAPI, Flask, .NET
  - FRONTEND: Angular, Next.js, React, Streamlit, HTML, CSS, JavaScript
  - DATABASES: MongoDB, MySQL, Pinecone, MSSQL
  - PROGRAMMING: Python, Java, C, C#
  - TOOLS: Git, GitHub, ClickUp

  NON-TECHNICAL SKILLS:
  - Effective communication, Problem solving & Critical thinking, Multi-tasking, Time management, Teamwork & Collaboration

  PROJECTS:

  1. Autonomous Multi-Agent Market Intelligence System
  Built an autonomous multi-agent AI system for competitive market intelligence using Python, LangChain, and LangGraph. Four specialized agents work in a DAG workflow: Strategist (research planning), Field Agent (Tavily API web research), Librarian (BeautifulSoup data extraction), and Consultant (report generation). Scraped data is indexed into session-based FAISS vector databases, enabling dynamic RAG for contextual analysis. Powered by Google Gemini 2.5 Flash, the system generates SWOT analyses, competitor matrices, and market gap reports with citations. Features an interactive Streamlit dashboard for real-time monitoring, follow-up Q&A against the knowledge base, and multi-format export capabilities.

  2. AI Agent Bot for Cloud-Native Vehicle Service Platform
  Contributed to a cloud-native vehicle service platform with 10+ microservices (Python, Go, Java Spring Boot) orchestrated via Kubernetes and Next.js frontend. Implemented an intelligent customer service agent using Python, FastAPI, LangChain, and Google Gemini 2.5 Flash. Designed a hybrid AI system featuring:
  - Agentic Tool Use: Real-time microservice integration for appointments, vehicle tracking, and work logs
  - RAG Pipeline: Pinecone vector database with sentence-transformers for knowledge retrieval
  The agent autonomously routes between RAG for static information and tool execution for dynamic operations, enabling seamless customer support.

  3. Interactive AI-Powered Developer Portfolio with Intelligent Assistant
  Developed a full-stack portfolio website using Next.js 15, React 19, TypeScript, and Tailwind CSS with an embedded AI chatbot powered by Google Gemini 2.5 Flash API. Implemented a custom RAG-based assistant providing real-time responses about professional experience and skills. Features include programmatic email delivery via Resend API, Framer Motion animations, responsive UI/UX design, dynamic project showcases, and seamless API route handling for chat and email functionalities.

  4. Intelligent Medical Assistant Chatbot with RAG Architecture
  Developed an AI medical assistant in Python using LangChain and RAG architecture. The system processes medical PDFs through DirectoryLoader, chunks text with RecursiveCharacterTextSplitter (500 tokens, 20-token overlap), and embeds using HuggingFace's all-MiniLM-L6-v2. Vector representations are indexed in Pinecone for semantic search. The Flask application integrates Google Gemini 2.5 Flash API, retrieves top-3 relevant documents, and generates medical responses with real-time processing and error handling.

  5. Neural Network Architectures: CNN & RNN Implementations
  - Deep CNN Emotion Recognition System: Binary CNN classifier using TensorFlow/Keras for happy/sad facial expression detection. TensorBoard monitoring and Streamlit deployment with real-time image upload and confidence scoring.
  - CIFAR-10 Multi-Class Image Classifier: Sequential CNN model classifying 10 object categories from CIFAR-10 dataset. Conv2D layers with MaxPooling.
  - Shakespearean Text Generation with RNN: Character-level RNN/LSTM trained on Shakespeare's corpus for poetic text generation. Streamlit interface with temperature-controlled sampling and custom seed prompt capabilities.

  6. Tea Factory Supply Chain Management System (2025 - Group Project Leader): Full-stack system using Angular, ASP.net, MSSQL, Azure. Features role-based auth and a dynamic Supplier Payment & Incentive system.
  7. Automated Water Tank Cleaning System (2024 - Group Hardware Project): Microcontroller-based prototype using C++, Schematic Design (EasyEDA). Features real-time water quality monitoring, Nema 17 stepper motors, and custom firmware for autonomous triggering.


  ADDITIONAL ACTIVITIES:
  - SpiritX 2025 (Stage 1) – Inter-University Development Competition
  - Xcelerate 2025 – Team Innovexa (MoraSpirit 360)
  - MoraXtreme 9.0 (2024) – Coding Competition Participant
  - FIT CodeRush 2023 – INTECS
  - Committee Member – NFB Championship 2024 (IEEE)
  - Volleyball Champion – Freshers' Meet 2023
  - FIT Future Careers 2024

  REFERENCES:
  1. Ms. Roshani Wijesuriya - Department of IT, Faculty of IT, University of Moratuwa | wijesuriyar@uom.com | 071 988 2759
  2. Mr. Aruna Withanage - Co-Founder/CEO, Effectz.AI | aruna@effectz.ai | 077 347 8988`;

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

      // Validate incoming messages
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
      }

      // Build conversation context with system instruction injected as first message
      const contents = [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "I understand. I'm MaheshBot, ready to answer questions about Tharindu Mahesh's professional profile." }] },
        ...convertMessagesToGemini(messages)
      ];
      
      // Call Gemini API with proper configuration
      const response: any = await ai.models.generateContent({
          model: "gemini-2.5-flash", 
          contents: contents,
          config: {
              temperature: 0.3, 
              maxOutputTokens: 1024,
              topP: 0.95,
              topK: 40,
          }
      });

      // Extract AI response text
      const aiTextContent = response.text; 

      if (!aiTextContent) {
          console.error("Gemini returned no text. Full response:", JSON.stringify(response, null, 2));
          return NextResponse.json({ error: "AI returned no text content." }, { status: 500 });
      }
      
      return NextResponse.json({ text: aiTextContent }, { status: 200 });

    } catch (error) {
      console.error("[CRITICAL GEMINI EXECUTION ERROR]", error);
      
      // Provide more detailed error information
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return NextResponse.json({ 
        error: "Failed to process chat request", 
        details: errorMessage 
      }, { status: 500 });
    }
  }