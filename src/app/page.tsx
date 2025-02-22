"use client";
import React, { useState } from "react";
import Navbar from "@/components/NavBar";
import Tease from "@/components/Tease";
import Links from "@/components/Links";
import CollageSlider from "@/components/CollageSlider";
import AboutAction from "@/components/AboutAction";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <Navbar setCurrentTab={setCurrentTab} />
      {currentTab == 0 && <Tease setCurrentTab={setCurrentTab} />}
      {currentTab == 1 && (
        <CollageSlider slideWidth={900}>
          <AboutAction />
          <AboutAction />
          <AboutAction />
        </CollageSlider>
      )}
      {currentTab == 2 && (
        <CollageSlider slideWidth={600}>
          <AboutAction />
          <AboutAction />
          <AboutAction />
        </CollageSlider>
      )}
      <Links />
    </div>
  );
}
