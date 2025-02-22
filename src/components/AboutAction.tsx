/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers content vertically */
  align-items: center; /* Centers content horizontally */
  text-align: center;
  padding: 4rem;
  height: 100%; /* Ensure it takes full available height */
`;

const titleStyle = css`
  font-size: 2rem;
  font-family: var(--font-righteous);
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const textStyle = css`
  font-size: 1rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--foreground);
`;

const AboutAction: React.FC = () => {
  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>Discover My Journey</h2>
      <p css={textStyle}>
        Dive into my personal story and see how I transformed my passion for
        technology into a dynamic career.
      </p>
    </div>
  );
};

export default AboutAction;
