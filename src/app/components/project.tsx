"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectData = [
  {
    id: 1,
    title: "Autonomous Multi-Agent Market Intelligence System",
    description: "Built an autonomous AI system with 4 specialized agents (Strategist, Field Agent, Librarian, Consultant) using Python, LangChain, and LangGraph. Features FAISS vector databases for dynamic RAG, SWOT analyses, and competitor matrices powered by Google Gemini 2.5 Flash with interactive Streamlit dashboard.",
    imgUrl: "/images/projects/1.jpg",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/tharindu-mahesh",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "AI Agent Bot for Cloud-Native Vehicle Service Platform",
    description: "Implemented an intelligent customer service agent using Python, FastAPI, LangChain, and Google Gemini 2.5 Flash. Features hybrid AI with agentic tool use for real-time microservice integration and RAG pipeline with Pinecone for knowledge retrieval in a Kubernetes-orchestrated platform.",
    imgUrl: "/images/projects/2.jpg",
    tag: ["All", "AI", "Web"],
    gitUrl: "https://github.com/tharindu-mahesh",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Interactive AI-Powered Portfolio",
    description: "Developed a full-stack portfolio using Next.js 15, React 19, and TypeScript with embedded AI chatbot powered by Google Gemini API. Features custom RAG-based assistant, programmatic email delivery via Resend API, Framer Motion animations, and seamless API route handling.",
    imgUrl: "/images/projects/3.jpg",
    tag: ["All", "Web", "AI"],
    gitUrl: "https://github.com/tharindu-mahesh",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Intelligent Medical Assistant Chatbot",
    description: "AI medical assistant using LangChain and RAG architecture. Processes medical PDFs with RecursiveCharacterTextSplitter, embeds using HuggingFace's all-MiniLM-L6-v2, and indexes in Pinecone. Flask application integrates Google Gemini 2.5 Flash API for accurate medical responses.",
    imgUrl: "/images/projects/4.jpg",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/tharindu-mahesh",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Deep CNN Emotion Recognition System",
    description: "Binary CNN classifier using TensorFlow/Keras for happy/sad facial expression detection. Features TensorBoard monitoring and Streamlit deployment with real-time image upload and confidence scoring for accurate emotion analysis.",
    imgUrl: "/images/projects/5.jpg",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/tharindu-mahesh",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Shakespearean Text Generation with RNN",
    description: "Character-level RNN/LSTM trained on Shakespeare's corpus for poetic text generation. Features Streamlit interface with temperature-controlled sampling and custom seed prompt capabilities for creative text generation.",
    imgUrl: "/images/projects/6.jpg",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/tharindu-mahesh",
    previewUrl: "/",
  },
  {
    id: 7,
    title: "Tea Factory Supply Chain Management System",
    description: "Full-stack Tea Factory Supply Chain Management System using Angular, ASP.NET, MSSQL, and Azure. Implemented role-based authentication with JWT, complete Supplier Payment & Incentive system with dynamic UI, custom toast notifications, and transactional finalization with secure audit trail.",
    imgUrl: "/images/projects/7.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/tharindu-mahesh",
    previewUrl: "/",
  },
];

const Project = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => setTag(newTag);

  const filteredProjects = projectData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" ref={ref} className="py-12 sm:py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
          My <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-[#ADB7BE] text-sm sm:text-base md:text-lg text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Explore my latest work and creative solutions
        </p>

        {/* Tag Buttons */}
        <div className="text-white flex flex-row justify-center items-center gap-2 sm:gap-3 py-4 sm:py-6">
          <ProjectTag
            onClick={handleTagChange}
            name="All"
            isSelected={tag === "All"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="AI"
            isSelected={tag === "AI"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Web"
            isSelected={tag === "Web"}
          />
        </div>

        {/* Project Cards */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.imgUrl}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
              />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Project;
