/** @jsxImportSource @emotion/react */
"use client";
import React, { useState } from "react";
import { css } from "@emotion/react";
import { ArrowRight } from "phosphor-react";
import Image from "next/image";

// Outer container to vertically center the entire section
const outerContainerStyle = css`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Section title style (aligned left)
const sectionTitleStyle = css`
  font-size: 2.5rem;
  font-family: var(--font-righteous);
  text-align: left;
  color: var(--foreground);
  margin: 2rem 5vw;
`;

// Container for the stage cards and arrow buttons
const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  margin: 0 5vw 2rem 5vw;
  flex-wrap: wrap;
`;

// Stage card style with fixed min-height, flex layout, and active highlighting
const stageCardStyle = (isActive: boolean) => css`
  background: var(--background);
  color: var(--foreground);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  max-width: 250px;
  flex: 1;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  cursor: pointer;
  border: ${isActive ? "2px solid #e52e71" : "none"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  }
`;

// Stage card title style
const stageTitleStyle = css`
  font-size: 1.5rem;
  font-family: var(--font-righteous);
  margin-bottom: 0.5rem;
  text-align: left;
`;

// Stage card short description style
const stageShortDescStyle = css`
  font-size: 0.875rem;
  line-height: 1.4;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: left;
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

// Detail container style for active stage details with extra right margin
const detailContainerStyle = css`
  margin: 0 10vw 2rem 5vw;
  padding: 2rem;
  background: var(--background);
  color: var(--foreground);
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
`;

// New grid style for the detail content: text on the left, image on the right
const detailGridStyle = css`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 2rem;
  align-items: start;
`;

// Detail text style – text stays on the left and adjusts width based on the image
const detailTextStyle = css`
  font-size: 1rem;
  line-height: 1.6;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: left;
`;

// Detail image style – the image occupies the right column
// Using responsive layout so the height is not fixed.
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

// Stage detail component for showing active stage details in an article-like layout
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

// Main About component
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
    <div css={outerContainerStyle}>
      <h1 css={sectionTitleStyle}>My Story</h1>
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
    </div>
  );
};

export default About;
