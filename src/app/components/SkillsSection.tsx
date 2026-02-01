"use client";

import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: '🤖',
    skills: ['RAG', 'FAISS', 'LangChain', 'LangGraph', 'LLMs', 'CNNs', 'RNN/LSTM', 'PyTorch', 'TensorFlow', 'Keras', 'HuggingFace']
  },
  {
    title: 'Programming Languages',
    icon: '</>',
    skills: ['Python', 'Java', 'C', 'C#', 'C++', 'JavaScript', 'TypeScript']
  },
  {
    title: 'Frontend Development',
    icon: '🎨',
    skills: ['React', 'Next.js', 'Angular', 'Streamlit', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion']
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    skills: ['Python', 'FastAPI', 'Flask', 'Node.js', 'ASP.NET', 'Spring Boot', 'Express']
  },
  {
    title: 'Databases & Vector Stores',
    icon: '💾',
    skills: ['MongoDB', 'MySQL', 'MSSQL', 'PostgreSQL', 'Pinecone', 'FAISS']
  },
  {
    title: 'Tools & Workflow',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'ClickUp', 'Docker', 'Kubernetes', 'Figma', 'Postman', 'JIRA', 'VS Code', 'Google Colab']
  }
];

const SkillsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-center px-4">
          Technical & <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Soft Skills</span>
        </h2>
        <p className="text-[#ADB7BE] text-sm sm:text-base md:text-lg text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
          Mastering a modern stack for full-stack and specialized development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-[#181818] border border-[#33353F] rounded-xl p-4 sm:p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="text-pink-500 text-lg sm:text-xl font-bold">{category.icon}</span>
                <h3 className="text-white text-lg sm:text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="w-full h-[1px] bg-gradient-to-r from-pink-500 to-transparent mb-4 sm:mb-6"></div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="bg-[#1a1c2e] text-[#ADB7BE] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#252740] hover:text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-default border border-transparent hover:border-purple-500/30"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
