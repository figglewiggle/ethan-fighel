/** @jsxImportSource @emotion/react */
"use client";
import React, { useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { Moon, Sun } from "phosphor-react";

const headerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const logoStyle = css`
  cursor: pointer;
`;

const navStyle = css`
  display: flex;
  gap: 3rem;
`;

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
    background: #b7245a;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #002244;
  }

  &:hover:after {
    width: 100%;
  }

  html.dark & {
    &:hover {
      color: #89b0d3;
    }
    &:after {
      background: #b7245a;
    }
  }
`;

const rightGroupStyle = css`
  display: flex;
  align-items: center;
`;

const themeToggleStyle = css`
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  user-select: none;
  margin-left: 5rem;
  margin-right: 5rem;
  color: #e52e71;
  &:hover {
    transform: scale(1.1);
    color: #b7245a;
  }
`;

interface NavbarProps {
  onNavClick: (tabIndex: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [mode, setMode] = useState(
    typeof window !== "undefined" &&
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
      {/* Logo linking to the first section */}
      <div css={logoStyle} onClick={() => onNavClick(0)}>
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
          <div css={navLinkStyle} onClick={() => onNavClick(1)}>
            About
          </div>
          <div css={navLinkStyle} onClick={() => onNavClick(2)}>
            Projects
          </div>
          <div css={navLinkStyle} onClick={() => onNavClick(3)}>
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
