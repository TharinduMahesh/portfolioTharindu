// src/app/components/AIChatbot.tsx
"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChatBubbleLeftIcon, XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: number;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message and set loading state
    const userMessage: Message = {
      role: "user",
      content: input,
      id: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const responseJson = await res.json();
      
      
      const rawText = responseJson.text; 

      const aiContent = rawText || 
                        responseJson?.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "Sorry, I could not respond. (Error: No text in response)";

      const aiMessage: Message = {
        role: "assistant",
        content: aiContent,
        id: Date.now() + 1,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat API error:", error);
      // Display a user-friendly error message
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`, id: Date.now() + 1 }]);
    } finally {
      setIsLoading(false);
    }
  };

  const darkBg = "bg-[#181818]";
  const lightText = "text-white";
  const accentColor = "text-purple-500";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className={`w-80 h-[450px] shadow-2xl rounded-xl flex flex-col overflow-hidden ${darkBg}`}>
          {/* Header */}
          <div className={`flex justify-between items-center p-4 border-b border-gray-700 ${darkBg} text-lg font-semibold`}>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full mr-2 bg-green-500 animate-pulse"></span>
              <span className={lightText}>AI Assistant</span>
            </div>
            <button onClick={toggleChat} className={`${accentColor} hover:text-white transition-colors`}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 italic pt-16">
                Hello! Ask me anything about Tharindu's projects, skills, or experience.
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-purple-600/70 text-white rounded-br-none"
                      : "bg-[#282828] text-gray-200 rounded-tl-none border border-purple-500/20"
                  }`}
                >
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-gray-500 text-sm animate-pulse">...typing</div>}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className={`flex p-3 border-t border-gray-700 ${darkBg}`}>
            <input
              className={`flex-grow p-3 rounded-l-lg focus:outline-none text-sm border-none ${darkBg} ${lightText} placeholder-gray-500`}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about Tharindu..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-r-lg bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform duration-200"
      >
        <ChatBubbleLeftIcon className="h-7 w-7 text-white" />
      </button>
    </div>
  );
}
