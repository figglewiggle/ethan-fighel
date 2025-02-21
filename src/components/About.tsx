/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  margin: 2rem 0 2rem 5vw;
  margin-top: 3rem;
  max-width: 800px;
  padding: 2.5rem;
  background: #cce7ff; /* Light mode: light background */
  color: #003366; /* Light mode: dark text */
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25); /* Increased box shadow */
  border-left: 5px solid #ff8a00;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  /* Dark mode styles */
  html.dark & {
    background: #002244; /* Dark mode: dark background */
    color: #a8cfff; /* Dark mode: light text */
    box-shadow: 0 12px 24px rgba(255, 255, 255, 0.2); /* Increased shadow for dark mode */
  }
`;

const titleStyle = css`
  font-size: 3rem;
  font-family: var(--font-righteous);
  margin-bottom: 1.5rem;
  text-align: left;
  color: inherit; /* Use container's text color */
  position: relative;
  padding-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60%;
    height: 4px;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
  }
`;

const textStyle = css`
  font-size: 1rem;
  line-height: 1.6;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: left;
  color: inherit; /* Use container's text color */
  transition: color 0.3s ease;

  p {
    margin-bottom: 1.25rem;
  }
`;

const About: React.FC = () => {
  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>About Me</h1>
      <div css={textStyle}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan
          eleifend sapien, vel commodo nibh dapibus et. Suspendisse potenti.
          Integer non lorem vitae justo cursus consequat. Curabitur tincidunt
          leo ut ipsum dictum, a pretium lectus consequat.
        </p>
        <p>
          Nullam consectetur libero sed sapien varius, sed consequat lorem
          volutpat. Cras finibus ex sed mauris luctus, non accumsan nibh
          fermentum. Praesent venenatis, dui a sagittis fermentum, massa libero
          iaculis elit, eget consectetur nisl nibh ac nulla.
        </p>
        <p>
          Duis ut elit euismod, feugiat libero eget, pretium dui. Curabitur
          blandit, nulla ut fermentum condimentum, ligula tortor posuere nunc,
          at scelerisque lacus nibh ac lorem.
        </p>
      </div>
    </div>
  );
};

export default About;
