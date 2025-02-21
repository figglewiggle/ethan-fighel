/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  margin: 2rem auto;
  max-width: 800px;
  padding: 2rem;
  background: var(--background);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const titleStyle = css`
  font-size: 3rem;
  font-family: var(--font-righteous);
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--foreground);
`;

const textStyle = css`
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--foreground);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
