/** @jsxImportSource @emotion/react */
"use client";
import React, { useState, useRef } from "react";
import { css } from "@emotion/react";
import Navbar from "@/components/NavBar";
import Tease from "@/components/Tease";
import Links from "@/components/Links";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ContactModal from "@/components/ContactModal";

const sectionStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

export default function Home() {
  // Create refs for each scrollable section.
  const teaseRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  // We'll remove the contact ref because Contact is now a modal.
  
  // State to control the visibility of the ContactModal
  const [contactModalOpen, setContactModalOpen] = useState(false);

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
    if (tabIndex === 3) {
      // Open the modal instead of scrolling to a section.
      setContactModalOpen(true);
    } else {
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
    }
  };

  return (
    <div>
      <Navbar onNavClick={handleNavClick} />
      <div ref={teaseRef}>
        <Tease onNavClick={handleNavClick} />
      </div>
      <div ref={aboutRef} css={sectionStyle}>
        <About />
      </div>
      <div ref={projectsRef} css={sectionStyle}>
        <Projects />
      </div>
      {/* The Contact section is now a modal. */}
      {contactModalOpen && (
        <ContactModal onCloseAction={() => setContactModalOpen(false)} />
      )}
      <Links />
    </div>
  );
}
