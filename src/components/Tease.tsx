/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";
import Link from "next/link";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 15vh;
  margin-left: 5vw;
`;

const nameStyle = css`
  font-size: 6rem;
  font-family: var(--font-righteous);
  margin: 0;
`;

const professionStyle = css`
  font-size: 1.5rem;
  font-family: var(--font-nunito-sans), sans-serif;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.75rem;
`;

const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #e52e71;
  color: #fff;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ff8a00;
    transform: translateX(4px);

    /* Invert the arrow color on hover */
    & > .arrow {
      color: #fff;
    }
  }
`;

const arrowStyle = css`
  font-size: 1.25rem;
  color: #ff8a00;
`;

const Tease: React.FC = () => {
  return (
    <div css={containerStyle}>
      <h1 css={nameStyle}>Ethan Fighel</h1>
      <p css={professionStyle}>Full-Stack Developer</p>
      <Link href="/about">
        <button css={buttonStyle}>
          More About Me{" "}
          <span className="arrow" css={arrowStyle}>
            →
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Tease;
