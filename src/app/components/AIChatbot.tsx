// // src/components/AIChatbot.tsx
// "use client";

// import { useChat, Message  } from 'ai/react'; // FIX: Message type added
// import React, { useState } from 'react';
// import { ChatBubbleLeftIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'; // FIX: PaperAirplaneIcon added

// export default function AIChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   
//   // Use Vercel AI SDK's useChat hook. The API path matches your serverless route.
//   const { 
//     messages, 
//     input, 
//     handleInputChange, 
//     handleSubmit, 
//     isLoading,
//     stop, // Allows stopping the generation if needed
//   } = useChat({
//     api: '/api/chat', 
//   });

//   // Toggle chat window open/closed
//   const toggleChat = () => setIsOpen(!isOpen);

//   // Styling constants based on your portfolio's theme
//   const darkBg = 'bg-[#181818]';
//   const lightText = 'text-white';
//   const accentColor = 'text-purple-500';

//   return (
//     // Fixed positioning for the floating chat button
//     <div className="fixed bottom-6 right-6 z-50">
//       
//       {/* Chat Window Container */}
//       {isOpen && (
//         <div className={`w-80 max-w-[90vw] h-[450px] shadow-2xl rounded-xl flex flex-col overflow-hidden mb-4 ${darkBg}`}>
//           
//           {/* Header */}
//           <div className={`flex justify-between items-center p-4 border-b border-gray-700 ${darkBg} text-lg font-semibold`}>
//             <div className='flex items-center'>
//               <span className={`h-3 w-3 rounded-full mr-2 ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></span>
//               <span className={lightText}>Tharindu AI Assistant</span>
//             </div>
//             <button onClick={toggleChat} className={`${accentColor} hover:text-white transition-colors`}>
//               <XMarkIcon className="h-6 w-6" />
//             </button>
//           </div>
//           
//           {/* Messages Container (Chat History) */}
//           <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
//             {messages.length === 0 && (
//                 <div className={`text-center text-gray-500 italic pt-16`}>
//                     Hello! I'm here to answer questions about Tharindu's projects, AI interests, and skills.
//                 </div>
//             )}
//             {messages.map(m => (
//               <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-wrap ${
//                   m.role === 'user' 
//                     ? 'bg-purple-600/70 text-white rounded-br-sm' 
//                     : 'bg-[#282828] text-gray-200 rounded-tl-sm border border-purple-500/20'
//                 }`}>
//                   {/* Using m.content directly is safe with Vercel AI SDK */}
//                   {m.content}
//                 </div>
//               </div>
//             ))}
//             {/* Typing Indicator */}
//             {isLoading && (
//               <div className='text-gray-500 text-sm animate-pulse'>...AI is thinking</div>
//             )}
//           </div>
//           
//           {/* Input Form */}
//           <form onSubmit={handleSubmit} className={`flex p-3 border-t border-gray-700 ${darkBg}`}>
//             <input
//               className={`flex-grow p-3 rounded-l-lg focus:outline-none text-sm border-2 border-gray-700 focus:border-purple-500 ${darkBg} ${lightText} placeholder-gray-500`}
//               value={input}
//               placeholder="Ask about Tharindu..."
//               onChange={handleInputChange}
//               disabled={isLoading}
//             />
//             <button
//               type="submit"
//               disabled={isLoading || input.trim() === ''}
//               className={`p-3 rounded-r-lg bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50`}
//             >
//               <PaperAirplaneIcon className="h-5 w-5 text-white" />
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Floating Toggle Button */}
//       <button 
//         onClick={toggleChat} 
//         className={`w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform duration-200`}
//       >
//         <ChatBubbleLeftIcon className="h-7 w-7 text-white" />
//       </button>
//     </div>
//   );
// }