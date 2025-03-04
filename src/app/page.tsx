"use client";
import React, { useRef, useEffect } from "react";
import Navbar from "@/components/NavBar";
import Tease from "@/components/Tease";
import Links from "@/components/Links";

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
      {/* Render your sections sequentially */}
      <div ref={teaseRef}>
        <Tease onNavClick={handleNavClick} />
      </div>
      <div
        ref={aboutRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <h2>About</h2>
        <p>This is the about section content.</p>
      </div>
      <div
        ref={projectsRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <h2>Projects</h2>
        <p>This is the projects section content.</p>
      </div>
      <div
        ref={contactRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <h2>Contact</h2>
        <p>This is the contact section content.</p>
      </div>
      <Links />
    </div>
  );
}
