/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import React from "react";
import CollageSlider from "@/components/CollageSlider";

const projectsContainerStyle = css`
  margin: 2rem 5vw;
  max-width: 1200px;
`;

const headerStyle = css`
  font-size: 2.5rem;
  font-family: var(--font-righteous);
  color: var(--foreground);
  margin-bottom: 1rem;
  text-align: left;
`;

const slideContainerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 2rem;
  align-items: center;
`;

const slideDescriptionStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const slideScreenshotStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const projectNameStyle = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

const projectDescriptionStyle = css`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const techStackStyle = css`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--foreground);
`;

const learnMoreStyle = css`
  margin-top: auto;
  font-size: 1rem;
  font-weight: bold;
  color: #e52e71;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #b7245a;
  }

  &:hover span {
    transform: translateX(4px);
  }
`;

const arrowStyle = css`
  font-size: 1.25rem;
  transition: transform 0.3s ease;
`;

const screenshotImageStyle = css`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Projects: React.FC = () => {
  const projects = [
    {
      name: "Project Alpha",
      description:
        "A full-stack application built for scalable performance and user-centric design.",
      tech: "Node.js, TypeScript, React, MongoDB",
      screenshot: "/images/project-alpha.png",
    },
    {
      name: "Project Beta",
      description:
        "A modern web app leveraging Python and Django to deliver robust features.",
      tech: "Python, Django, PostgreSQL",
      screenshot: "/images/project-beta.png",
    },
    {
      name: "Project Gamma",
      description:
        "Enterprise-grade software solution using Java and Spring Boot for high reliability.",
      tech: "Java, Spring Boot, MySQL",
      screenshot: "/images/project-gamma.png",
    },
  ];

  return (
    <div css={projectsContainerStyle}>
      <h2 css={headerStyle}>My Projects</h2>
      <CollageSlider slideWidth="120vh" slideHeight="40vh">
        {projects.map((project, index) => (
          <div key={index} css={slideContainerStyle}>
            <div css={slideDescriptionStyle}>
              <h3 css={projectNameStyle}>{project.name}</h3>
              <p css={projectDescriptionStyle}>{project.description}</p>
              <p css={techStackStyle}>{project.tech}</p>
              <div css={learnMoreStyle}>
                Learn More <span css={arrowStyle}>→</span>
              </div>
            </div>
            <div css={slideScreenshotStyle}>
              <img
                src={project.screenshot}
                alt={`Screenshot of ${project.name}`}
                css={screenshotImageStyle}
              />
            </div>
          </div>
        ))}
      </CollageSlider>
    </div>
  );
};

export default Projects;
