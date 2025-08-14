
"use client";
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectTag from './ProjectTag';
import { title } from 'process';

const projectData = [
  {
    id: 1,
    title: 'Project One',
    description: 'This is a description of project one.', 
    imgUrl: '/images/projects/1.jpg',
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/"
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'This is a description of project two.', 
    imgUrl: '/images/projects/2.jpg',
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/"
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'This is a description of project three.', 
    imgUrl: '/images/projects/3.jpg',
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/"
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'This is a description of project four.', 
    imgUrl: '/images/projects/4.jpg',
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/"
  },
  {
    id: 5,
    title: 'Project Five',
    description: 'This is a description of project five.', 
    imgUrl: '/images/projects/5.jpg',
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/"
  },
   {
     id: 6,
    title: 'Project Five',
    description: 'This is a description of project five.', 
    imgUrl: '/images/projects/6.jpg',
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/"
  },


  
];

const Project = () => {
  const [tag, setTag] = useState('All');

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectData.filter((project) =>
    project.tag.includes(tag)
  );

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === 'All'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === 'Web'}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === 'Mobile'}
        />
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {/* FIX: Map over the 'filteredProjects' array, not the original 'projectData' */}
        {filteredProjects.map((project) => (
          <ProjectCard
            // FIX: Corrected prop syntax
            key={project.id}
            title={project.title}
            description={project.description}
            imgUrl={project.imgUrl}
            gitUrl={project.gitUrl}
            previewUrl={project.previewUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Project;