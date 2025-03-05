/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import React, { useRef } from "react";
import Navbar from "@/components/NavBar";
import Tease from "@/components/Tease";
import Links from "@/components/Links";
import About from "@/components/About";
import Projects from "@/components/Projects";

export default function Home() {
  // Create refs for each scrollable section.
  const teaseRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime: number | null = null;

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      window.scrollTo(0, startY + diff * easedProgress);
      if (timeElapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleNavClick = (tabIndex: number) => {
    let targetRef;
    switch (tabIndex) {
      case 0:
        targetRef = teaseRef;
        break;
      case 1:
        targetRef = aboutRef;
        break;
      case 2:
        targetRef = projectsRef;
        break;
      case 3:
        targetRef = contactRef;
        break;
      default:
        targetRef = teaseRef;
    }
    if (targetRef && targetRef.current) {
      const yOffset = -80; // Adjust offset for fixed header
      const y =
        targetRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      smoothScrollTo(y, 500); // Scroll over 500ms
    }
  };

  return (
    <div>
      <Navbar onNavClick={handleNavClick} />
      <div ref={teaseRef}>
        <Tease onNavClick={handleNavClick} />
      </div>
      {/* Replace the placeholder About section with the About component */}
      <div ref={aboutRef} css={sectionStyle}>
        <About />
      </div>
      <div ref={projectsRef} css={sectionStyle}>
        <Projects />
      </div>
      <div ref={contactRef} css={sectionStyle}>
        <h2>Contact</h2>
        <p>This is the contact section content.</p>
      </div>
      <Links />
    </div>
  );
}

const sectionStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;
