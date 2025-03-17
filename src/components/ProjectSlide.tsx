/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import React, { useState, useRef } from "react";
import { CaretUp, CaretDown } from "phosphor-react";

const slideContainerStyle = css`
  display: grid;
  grid-template-rows: auto auto; /* two rows: base row and dropdown */
  width: 100%;
  gap: 1rem;
`;

const baseRowStyle = css`
  display: flex;
  flex-direction: row; /* side-by-side layout */
  align-items: center;
  gap: 2rem;
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
  margin-top: 1rem; /* spacing below the base content */
  font-size: 1rem;
  font-weight: bold;
  color: #e52e71;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  cursor: pointer;

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

const expandedContentStyle = css`
  padding-top: 1rem;
  font-size: 1rem;
  color: var(--foreground);
`;

/* Dropdown container will animate height */
const dropdownContainerStyle = css`
  overflow: hidden;
  transition: height 0.3s ease;
  height: 0;
`;

interface Project {
  name: string;
  description: string;
  tech: string;
  screenshot: string;
  details: string;
}

const ProjectSlide: React.FC<{
  project: Project;
  onToggle: (expanded: boolean) => void;
}> = ({ project, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!expanded) {
      // EXPAND: Measure content and set height to that value
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        setDropdownHeight(`${scrollHeight}px`);
      }
      setExpanded(true);
      onToggle(true);
    } else {
      // COLLAPSE: If height is auto, set it to its pixel value first,
      // then in the next frame set height to 0.
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        // Force a pixel value
        setDropdownHeight(`${scrollHeight}px`);
        // Wait for next frame to trigger the transition
        requestAnimationFrame(() => {
          setDropdownHeight("0px");
        });
      }
      setExpanded(false);
      onToggle(false);
    }
  };

  const handleTransitionEnd = () => {
    if (expanded) {
      // After expansion, set height to auto to allow dynamic content.
      setDropdownHeight("auto");
    }
  };

  return (
    <div css={slideContainerStyle}>
      {/* Base row: description and screenshot side by side */}
      <div css={baseRowStyle}>
        <div css={slideDescriptionStyle}>
          <h3 css={projectNameStyle}>{project.name}</h3>
          <p css={projectDescriptionStyle}>{project.description}</p>
          <p css={techStackStyle}>{project.tech}</p>
          <div css={learnMoreStyle} onClick={handleToggle}>
            {expanded ? "Show Less" : "Learn More"}{" "}
            {expanded ? (
              <CaretUp size={24} css={arrowStyle} />
            ) : (
              <CaretDown size={24} css={arrowStyle} />
            )}
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
      {/* Dropdown row for expanded details */}
      <div
        css={dropdownContainerStyle}
        style={{ height: dropdownHeight }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div ref={contentRef} css={expandedContentStyle}>
          {project.details}
        </div>
      </div>
    </div>
  );
};

export default ProjectSlide;
