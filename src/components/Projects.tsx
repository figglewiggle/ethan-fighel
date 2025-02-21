/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

const projectsContainerStyle = css`
  margin: 2rem 5vw;
  max-width: 1200px;
`;

const headerStyle = css`
  font-size: 2.5rem;
  font-family: var(--font-righteous);
  color: var(--foreground);
  margin-bottom: 1.5rem;
  text-align: left;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const cardStyle = css`
  background: #ffffff;
  color: #003366;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }

  /* When dark mode is enabled via html.dark */
  html.dark & {
    background: #1a1a1a;
    color: #ededed;
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  }
`;

const projectNameStyle = css`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const techStackStyle = css`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const learnMoreStyle = css`
  margin-top: auto;
  font-size: 1rem;
  font-weight: bold;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8a00;
  }

  &:hover span {
    transform: translateX(4px);
  }
`;

const arrowStyle = css`
  font-size: 1.25rem;
  transition: transform 0.3s ease;
`;

const Projects: React.FC = () => {
  const projects = [
    {
      name: "Project Alpha",
      tech: "Node.js, TypeScript, React, MongoDB",
    },
    {
      name: "Project Beta",
      tech: "Python, Django, PostgreSQL",
    },
    {
      name: "Project Gamma",
      tech: "Java, Spring Boot, MySQL",
    },
  ];

  return (
    <div css={projectsContainerStyle}>
      <h2 css={headerStyle}>Projects</h2>
      <div css={gridStyle}>
        {projects.map((project, index) => (
          <div key={index} css={cardStyle}>
            <div>
              <h3 css={projectNameStyle}>{project.name}</h3>
              <p css={techStackStyle}>{project.tech}</p>
            </div>
            <div css={learnMoreStyle}>
              Learn More <span css={arrowStyle}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
