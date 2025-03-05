/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

export default function About() {
  return (
    <div css={aboutContainer}>
      <h2 css={titleStyle}>My Skills</h2>
      <div css={contentWrapper}>
        <div css={paragraphStyle}>
          <p>
            I am a <strong>strategic problem solver</strong> with a keen eye for
            building <strong>scalable, user-centric applications</strong>. My
            strength lies in leading projects with creativity,{" "}
            <strong>effective communication</strong>, and a commitment to
            continuous improvement. I thrive in{" "}
            <strong>collaborative environments</strong> and excel at navigating
            challenges to deliver <strong>innovative solutions</strong>.
          </p>
          <p>
            Below is a list of the <strong>programming languages</strong> and{" "}
            <strong>frameworks</strong> I have worked with:
          </p>
        </div>
        <div css={listStyle}>
          <ul>
            <li>TypeScript</li>
            <li>Python</li>
            <li>Java</li>
          </ul>
          <ul>
            <li>React</li>
            <li>Next.js</li>
            <li>SQL</li>
          </ul>
          <ul>
            <li>JavaScript</li>
            <li>C</li>
            <li>C++</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const aboutContainer = css`
  width: 60%;
  padding: 0 2rem;
  box-sizing: border-box;
`;

const titleStyle = css`
  text-align: left;
  margin-bottom: 1rem;
  font-family: var(--font-montserrat);
  font-size: 3rem;
`;

const contentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-top: 2px solid rgba(229, 46, 113, 0.5);
  border-bottom: 2px solid rgba(229, 46, 113, 0.5);
  padding-top: 2rem;
`;

const paragraphStyle = css`
  font-family: var(--font-nunito-sans);
  font-size: 1.125rem;
  line-height: 1.75;
  p {
    margin-bottom: 1rem;
  }
`;

const listStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1rem;
  ul {
    font-family: var(--font-roboto-mono);
    font-weight: bold;
    list-style: none;
    padding-left: 0;
    flex: 1 1 200px;
    li {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
`;
