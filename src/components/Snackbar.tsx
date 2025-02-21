/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

const snackbarContainer = css`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #ff8a00; /* Matches your app's accent/hover color */
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const visibleStyle = css`
  opacity: 1;
  transform: translateY(0);
`;

interface SnackbarProps {
  message: string;
  show: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, show }) => {
  return <div css={[snackbarContainer, show && visibleStyle]}>{message}</div>;
};

export default Snackbar;
