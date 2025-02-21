/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  margin: 2rem 0 2rem 5vw; /* Positioned to the left with some left margin */
  margin-top: 3rem;
  max-width: 800px; /* Set width to 800px */
  padding: 2.5rem;
  background: var(--background);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
`;

const titleStyle = css`
  font-size: 3rem;
  font-family: var(--font-righteous);
  margin-bottom: 1.5rem;
  text-align: left; /* Align title to the left */
  color: var(--foreground);
`;

const textStyle = css`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--foreground);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: left; /* Ensure text is aligned to the left */
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
