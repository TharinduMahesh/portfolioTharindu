"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectData = [
  {
    id: 1,
    title: "Project One",
    description: "This is a description of project one.",
    imgUrl: "/images/projects/1.jpg",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Project Two",
    description: "This is a description of project two.",
    imgUrl: "/images/projects/2.jpg",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Project Three",
    description: "This is a description of project three.",
    imgUrl: "/images/projects/3.jpg",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Project Four",
    description: "This is a description of project four.",
    imgUrl: "/images/projects/4.jpg",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Project Five",
    description: "This is a description of project five.",
    imgUrl: "/images/projects/5.jpg",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Project Six",
    description: "This is a description of project six.",
    imgUrl: "/images/projects/6.jpg",
    tag: ["All", "Web"],
    gitUrl: "/",
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
    <section id="projects" ref={ref} className="py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-4">
          My <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-[#ADB7BE] text-base md:text-lg text-center mb-12 max-w-2xl mx-auto">
          Explore my latest work and creative solutions
        </p>

        {/* Tag Buttons */}
        <div className="text-white flex flex-row justify-center items-center gap-3 py-6">
          <ProjectTag
            onClick={handleTagChange}
            name="All"
            isSelected={tag === "All"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Web"
            isSelected={tag === "Web"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Mobile"
            isSelected={tag === "Mobile"}
          />
        </div>

        {/* Project Cards */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
