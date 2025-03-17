/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";
import { PaperPlaneRight } from "phosphor-react";

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContainerStyle = css`
  background: var(--background);
  color: var(--foreground);
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const titleStyle = css`
  font-size: 3rem;
  font-family: var(--font-montserrat);
  margin-bottom: 1rem;
  text-align: left;
`;

const dividerStyle = css`
  height: 2px;
  background: rgba(229, 46, 113, 0.5);
  margin: 1rem 0;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const inputStyle = css`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: var(--font-nunito-sans), Arial, Helvetica, sans-serif;
`;

const textareaStyle = css`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: var(--font-nunito-sans), Arial, Helvetica, sans-serif;
  resize: vertical;
`;

/* Updated Send button style */
const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #e52e71;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d84166;
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const clearButtonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--foreground);
  color: var(--background);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: filter 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;


/* Container for the two buttons, laid out in a row */
const buttonRowStyle = css`
  display: flex;
  gap: 1rem;
  width: 100%;
  & > button {
    flex: 1;
  }
`;

const signupTextStyle = css`
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
  color: var(--foreground);

  a {
    color: #e52e71;
    text-decoration: underline;
  }
`;

export default function ContactModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send email, etc.)
    alert("Message sent!");
    onCloseAction();
  };

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContainerStyle}>
        {/* Close Button */}
        <button
          onClick={onCloseAction}
          css={css`
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--foreground);
          `}
        >
          &times;
        </button>
        {/* Title Section */}
        <h2 css={titleStyle}>Contact Me</h2>
        <div css={dividerStyle} />
        {/* Email Form */}
        <form css={formStyle} onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" css={inputStyle} required />
          <input type="email" placeholder="Email" css={inputStyle} required />
          <input type="text" placeholder="Subject" css={inputStyle} required />
          <textarea
            placeholder="Message"
            css={textareaStyle}
            rows={5}
            required
          />
          <div css={buttonRowStyle}>
            <button type="submit" css={buttonStyle}>
              Send{" "}
              <span className="arrow">
                <PaperPlaneRight size={24} weight="duotone" />
              </span>
            </button>
            <button type="reset" css={clearButtonStyle}>
              Clear
            </button>
          </div>
        </form>
        {/* Small Text Tidbit */}
        <div css={signupTextStyle}>
          Prefer a meeting? Schedule one on{" "}
          <a
            href="https://calendly.com/ethfig/career-chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calendly
          </a>
        </div>
        <div css={dividerStyle} />
      </div>
    </div>
  );
}
