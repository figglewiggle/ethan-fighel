/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

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
  margin-right: 10rem;
`;

// Styles for each navigation link with a vibrant gradient hover underline
const navLinkStyle = css`
  text-decoration: none;
  color: inherit;
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

const Navbar: React.FC = () => {
  return (
    <div css={headerStyle}>
      {/* Logo linking to home */}
      <Link href="/" css={logoStyle}>
        <Image
          src="/ethanlogo.png"
          alt="ethan fighel's logo"
          width={113}
          height={71}
        />
      </Link>

      {/* Navigation tabs */}
      <nav css={navStyle}>
        <Link href="/about" css={navLinkStyle}>
          About
        </Link>
        <Link href="/projects" css={navLinkStyle}>
          Projects
        </Link>
        <Link href="/contact" css={navLinkStyle}>
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
