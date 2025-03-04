/** @jsxImportSource @emotion/react */
"use client";
import React, { useState } from "react";
import { css } from "@emotion/react";
import { ArrowRight } from "phosphor-react";
import Image from "next/image";

// Container that fills the viewport and handles its own scrolling
const scrollableContainerStyle = css`
  height: 100vh;
  overflow-y: auto;
  background: var(--background);
  color: var(--foreground);
`;

// Introductory section styles
const introContainerStyle = css`
  padding: 2rem 5vw;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const subheaderStyle = css`
  font-size: 1.5rem;
  font-family: var(--font-nunito-sans);
  margin: 0;
  color: var(--foreground);
`;

const headerStyle = css`
  font-size: 3rem;
  font-family: var(--font-montserrat);
  margin: 0.25rem 0 0;
  color: var(--foreground);
`;

// Outer content container for the timeline section
const contentContainerStyle = css`
  padding: 2rem 5vw;
`;

// Container for the stage cards and arrow buttons
const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

// Stage card style with active highlighting
const stageCardStyle = (isActive: boolean) => css`
  background: var(--background);
  color: var(--foreground);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  flex: 1;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  cursor: pointer;
  border: ${isActive ? "2px solid #e52e71" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const stageTitleStyle = css`
  font-size: 1.5rem;
  font-family: var(--font-montserrat);
  margin-bottom: 0.5rem;
`;

const stageShortDescStyle = css`
  font-size: 0.875rem;
  line-height: 1.4;
  font-family: var(--font-roboto-mono);
`;

// Arrow button style – clickable arrow icon
const arrowButtonStyle = css`
  color: var(--foreground);
  font-size: 32px;
  transition: transform 0.3s ease;
  margin: 0 1rem;
  cursor: pointer;

  &:hover {
    transform: translateX(4px);
  }
`;

// Detail container style for active stage details
const detailContainerStyle = css`
  padding: 2rem;
  background: var(--background);
  color: var(--foreground);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const detailGridStyle = css`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: start;
`;

const detailTextStyle = css`
  font-size: 1rem;
  line-height: 1.6;
  font-family: var(--font-roboto-mono);
`;

const detailImageStyle = css`
  border-radius: 8px;
  max-width: 100%;
  height: auto;
`;

// Define the type for each stage
interface Stage {
  title: string;
  shortDesc: string;
  detailText: string;
  imageUrl: string;
}

// Stage card component
interface StageCardProps {
  stage: Stage;
  isActive: boolean;
  onClick: () => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, isActive, onClick }) => (
  <div css={stageCardStyle(isActive)} onClick={onClick}>
    <h2 css={stageTitleStyle}>{stage.title}</h2>
    <p css={stageShortDescStyle}>{stage.shortDesc}</p>
  </div>
);

// Arrow button component
interface ArrowButtonProps {
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick }) => (
  <div css={arrowButtonStyle} onClick={onClick}>
    <ArrowRight />
  </div>
);

// Stage detail component for showing active stage details
interface StageDetailProps {
  stage: Stage;
}

const StageDetail: React.FC<StageDetailProps> = ({ stage }) => (
  <div css={detailContainerStyle}>
    <div css={detailGridStyle}>
      <div css={detailTextStyle}>
        <p>{stage.detailText}</p>
      </div>
      <div>
        <Image
          src={stage.imageUrl}
          alt={stage.title}
          layout="responsive"
          width={600}
          height={400}
          css={detailImageStyle}
        />
      </div>
    </div>
  </div>
);

// Main About component with the updated structure
const About: React.FC = () => {
  const stages: Stage[] = [
    {
      title: "High School",
      shortDesc: "Early discovery and curiosity",
      detailText:
        "During high school, I explored robotics, participated in coding clubs, and built my first simple programs. This period ignited my passion for technology.",
      imageUrl: "/JavaLogo.png", // Replace with your image URL
    },
    {
      title: "University",
      shortDesc: "Growth and learning",
      detailText:
        "University was a time of growth. I immersed myself in computer science courses, participated in hackathons, and collaborated on projects that honed my skills.",
      imageUrl: "/university.jpg", // Replace with your image URL
    },
    {
      title: "Future",
      shortDesc: "Innovation ahead",
      detailText:
        "I'm excited about the future. My goal is to lead innovation in the tech industry, creating impactful solutions that drive progress.",
      imageUrl: "/future.jpg", // Replace with your image URL
    },
  ];

  const [activeStage, setActiveStage] = useState<number>(0);

  // Advance to next stage when arrow is clicked
  const handleNextStage = (index: number) => {
    setActiveStage(index);
  };

  return (
    <div css={scrollableContainerStyle}>
      {/* Introductory Section */}
      <section css={introContainerStyle}>
        <p css={subheaderStyle}>Hey! I'm</p>
        <h1 css={headerStyle}>Ethan Fighel</h1>
      </section>

      {/* Timeline/Story Section */}
      <section css={contentContainerStyle}>
        <div css={containerStyle}>
          {stages.map((stage, index) => (
            <React.Fragment key={index}>
              <StageCard
                stage={stage}
                isActive={index === activeStage}
                onClick={() => setActiveStage(index)}
              />
              {index < stages.length - 1 && (
                <ArrowButton onClick={() => handleNextStage(index + 1)} />
              )}
            </React.Fragment>
          ))}
        </div>
        <StageDetail stage={stages[activeStage]} />
      </section>
    </div>
  );
};

export default About;
