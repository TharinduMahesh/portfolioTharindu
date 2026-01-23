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
  const [messageIdCounter, setMessageIdCounter] = useState(0);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message and set loading state
    const userMessage: Message = {
      role: "user",
      content: input,
      id: messageIdCounter,
    };
    setMessageIdCounter(prev => prev + 1);
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
        id: messageIdCounter,
      };
      setMessageIdCounter(prev => prev + 1);

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat API error:", error);
      // Display a user-friendly error message
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`, id: messageIdCounter }]);
      setMessageIdCounter(prev => prev + 1);
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
        <div className="w-96 h-[550px] shadow-2xl rounded-2xl flex flex-col overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-white/10 backdrop-blur-xl">
          {/* Header */}
          <div className="relative flex justify-between items-center p-5 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#0a0a0a] animate-pulse"></span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">AI Assistant</span>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            >
              <XMarkIcon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="block font-semibold text-white mb-2">👋 Hello!</span>
                  Ask me anything about Tharindu's projects, skills, or experience.
                </p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-md shadow-lg shadow-purple-500/20"
                      : "bg-white/5 text-gray-200 rounded-tl-md border border-white/10 backdrop-blur-sm"
                  }`}
                >
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-md p-4 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
            <div className="flex gap-2">
              <input
                className="flex-grow p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none text-sm text-white placeholder-gray-500 transition-all backdrop-blur-sm"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
              >
                <PaperAirplaneIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="group w-16 h-16 rounded-full shadow-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-purple-500/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <ChatBubbleLeftIcon className="h-8 w-8 text-white relative z-10" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>
    </div>
  );
}
