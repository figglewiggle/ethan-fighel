/** @jsxImportSource @emotion/react */
"use client";
import React, { useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "phosphor-react";

// Styles for the header container
const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

// Style for the logo container
const logoStyle = css`
  cursor: pointer;
`;

// Styles for the navigation links container
const navStyle = css`
  display: flex;
  gap: 3rem;
`;

// Styles for each navigation link with a vibrant gradient hover underline
const navLinkStyle = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  position: relative;
  transition: color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -4px;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #e52e71; /* Text color changes on hover */
  }

  &:hover:after {
    width: 100%;
  }
`;

const rightGroupStyle = css`
  display: flex;
  align-items: center;
`;

const themeToggleStyle = css`
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  margin-left: 5rem;
  margin-right: 5rem;
  color: #e52e71;
  &:hover {
    transform: scale(1.1);
    color: #ff8a00;
  }
`;

interface NavbarProps {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentTab }) => {
  const [mode, setMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setMode(false);
    } else {
      html.classList.add("dark");
      setMode(true);
    }
  };

  return (
    <div css={headerStyle}>
      {/* Logo linking to home */}
      <div css={logoStyle} onClick={() => setCurrentTab(0)}>
        <Image
          src="/ethanlogo.png"
          alt="ethan fighel's logo"
          width={113}
          height={71}
        />
      </div>

      {/* Navigation tabs */}
      <div css={rightGroupStyle}>
        <nav css={navStyle}>
          <div css={navLinkStyle} onClick={() => setCurrentTab(1)}>
            About
          </div>
          <div css={navLinkStyle} onClick={() => setCurrentTab(2)}>
            Projects
          </div>
          <div css={navLinkStyle} onClick={() => setCurrentTab(3)}>
            Contact
          </div>
        </nav>
        <div css={themeToggleStyle} onClick={toggleTheme}>
          {mode ? <Moon size={32} /> : <Sun size={32} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
