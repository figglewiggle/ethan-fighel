/** @jsxImportSource @emotion/react */
"use client";
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  Phone,
} from "phosphor-react";
import Snackbar from "./Snackbar";

const containerStyle = css`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
`;

const iconStyle = css`
  color: #e52e71;
  transition: color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #b7245a; /* Darker version of the base icon color */
    transform: scale(1.1);
  }
`;

const Links: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const copyPhoneNumber = () => {
    navigator.clipboard
      .writeText("+14168419626")
      .then(() => {
        setSnackbarMessage("Phone number copied to clipboard!");
        setShowSnackbar(true);
      })
      .catch((err) => {
        console.error("Failed to copy phone number:", err);
      });
  };

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  return (
    <>
      <div css={containerStyle}>
        <Link
          href="mailto:ethfig@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <EnvelopeSimple size={32} css={iconStyle} />
        </Link>
        <div
          onClick={copyPhoneNumber}
          css={iconStyle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              copyPhoneNumber();
            }
          }}
        >
          <Phone size={32} />
        </div>
        <Link
          href="https://github.com/figglewiggle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo size={32} css={iconStyle} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/ethan-fighel-309204253"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinLogo size={32} css={iconStyle} />
        </Link>
      </div>
      <Snackbar message={snackbarMessage} show={showSnackbar} />
    </>
  );
};

export default Links;
