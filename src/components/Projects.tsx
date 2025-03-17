/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import React, { useState } from "react";
import CollageSlider from "@/components/CollageSlider";
import ProjectSlide from "./ProjectSlide"; // assuming you export it from a separate file

const projectsContainerStyle = css`
  margin: 2rem 2rem;
  max-width: 1200px;
`;

const headerStyle = css`
  font-size: 3rem;
  font-family: var(--font-montserrat);
  color: var(--foreground);
  margin-bottom: 1rem;
  text-align: left;
`;

interface Project {
  name: string;
  description: string;
  tech: string;
  screenshot: string;
  details: string;
}

const Projects: React.FC = () => {
  // Global expanded state—if any slide is expanded, slider height becomes 70vh.
  const [expanded, setExpanded] = useState(false);

  const projects: Project[] = [
    {
      name: "Project Alpha",
      description:
        "A full-stack application built for scalable performance and user-centric design.",
      tech: "Node.js, TypeScript, React, MongoDB",
      screenshot: "/CliencePage.png",
      details:
        "Project Alpha leverages a microservices architecture to ensure scalability and resilience. It integrates with multiple third-party APIs to enhance user experience and streamline business processes.",
    },
    {
      name: "Project Beta",
      description:
        "A modern web app leveraging Python and Django to deliver robust features.",
      tech: "Python, Django, PostgreSQL",
      screenshot: "/CliencePage.png",
      details:
        "Project Beta focuses on delivering a seamless user experience with robust backend services. The app employs RESTful APIs and responsive design principles to serve its users efficiently.",
    },
    {
      name: "Project Gamma",
      description:
        "Enterprise-grade software solution using Java and Spring Boot for high reliability.",
      tech: "Java, Spring Boot, MySQL",
      screenshot: "/CliencePage.png",
      details:
        "Project Gamma is designed for high performance in demanding enterprise environments. It includes advanced security features, high availability, and extensive monitoring capabilities.",
    },
  ];

  return (
    <div css={projectsContainerStyle}>
      <h2 css={headerStyle}>My Projects</h2>
      <CollageSlider
        slideWidth="120vh"
        slideHeight={expanded ? "70vh" : "40vh"}
      >
        {projects.map((project, index) => (
          <ProjectSlide
            key={index}
            project={project}
            onToggle={(isExpanded) => setExpanded(isExpanded)}
          />
        ))}
      </CollageSlider>
    </div>
  );
};

export default Projects;
