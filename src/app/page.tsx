"use client";
import React, { useState } from "react";
import Navbar from "@/components/NavBar";
import Tease from "@/components/Tease";
import About from "@/components/About";
import Links from "@/components/Links";
import Projects from "@/components/Projects";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <Navbar setCurrentTab={setCurrentTab} />
      {currentTab == 0 && <Tease setCurrentTab={setCurrentTab} />}
      {currentTab == 1 && <About />}
      {currentTab == 2 && <Projects />}
      <Links />
    </div>
  );
}
