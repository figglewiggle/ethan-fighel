/** @jsxImportSource @emotion/react */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface CollageSliderProps {
  children: React.ReactNode;
  // Pass dimensions as strings in vh (e.g., "80vh")
  slideWidth?: string;
  slideHeight?: string;
}

const sliderContainerStyle = css`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
`;

const slidesWrapperStyle = css`
  display: flex;
  transition: transform 0.3s ease;
  user-select: none;
  cursor: grab;
`;

const arrowButtonStyle = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const leftArrowStyle = css`
  left: 10px;
`;

const rightArrowStyle = css`
  right: 10px;
`;

// Helper function to convert a vh string (e.g., "80vh") to pixels.
const convertVhToPx = (vh: string): number => {
  const numericValue = parseFloat(vh);
  return (window.innerHeight * numericValue) / 100;
};

const CollageSlider: React.FC<CollageSliderProps> = ({
  children,
  slideWidth,
  slideHeight,
}) => {
  // Convert children to an array (for circular rotation)
  const originalSlides = React.Children.toArray(children);
  const [slides, setSlides] = useState(originalSlides);
  const slideCount = slides.length;

  // Set defaults if no props provided (using vh units)
  const defaultWidth = slideWidth || "120vh";
  const defaultHeight = slideHeight || "70vh";

  // We need a pixel value for the slide width to calculate translations.
  const [computedWidth, setComputedWidth] = useState(0);

  // Update computedWidth on mount and when the window resizes.
  useEffect(() => {
    const updateWidth = () => {
      setComputedWidth(convertVhToPx(defaultWidth));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [defaultWidth]);

  // offset (in pixels) controls the current slide translation.
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update the slider's transform on offset change.
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = transitionEnabled
        ? "transform 0.3s ease"
        : "none";
      sliderRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [offset, transitionEnabled]);

  // Advance to next slide (translate left by one slide width).
  const nextSlide = () => {
    setTransitionEnabled(true);
    setOffset(-computedWidth);
  };

  // Once the transition completes, update the slides array.
  const handleNextTransitionEnd = () => {
    setSlides((prev) => {
      const newSlides = [...prev];
      const first = newSlides.shift();
      if (first !== undefined) {
        newSlides.push(first);
      }
      return newSlides;
    });
    setTransitionEnabled(false);
    setOffset(0);
    setTimeout(() => setTransitionEnabled(true), 50);
  };

  // For the previous slide, move the last slide to the front and animate back.
  const prevSlide = () => {
    setTransitionEnabled(false);
    setSlides((prev) => {
      const newSlides = [...prev];
      const last = newSlides.pop();
      if (last !== undefined) {
        newSlides.unshift(last);
      }
      return newSlides;
    });
    setOffset(-computedWidth);
    setTimeout(() => {
      setTransitionEnabled(true);
      setOffset(0);
    }, 50);
  };

  // Listen for the end of the transition.
  const handleTransitionEnd = () => {
    if (offset === -computedWidth) {
      handleNextTransitionEnd();
    }
  };

  // Throttle wheel events so only one slide change occurs at a time.
  const scrollingRef = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (scrollingRef.current) return;
    const threshold = 50;
    if (e.deltaX > threshold) {
      nextSlide();
      scrollingRef.current = true;
      setTimeout(() => {
        scrollingRef.current = false;
      }, 350);
    } else if (e.deltaX < -threshold) {
      prevSlide();
      scrollingRef.current = true;
      setTimeout(() => {
        scrollingRef.current = false;
      }, 350);
    }
  };

  return (
    <div
      css={sliderContainerStyle}
      style={{
        width: defaultWidth, // Using the vh string directly
        height: defaultHeight, // Using the vh string directly
      }}
      onWheel={handleWheel}
    >
      <div
        ref={sliderRef}
        css={slidesWrapperStyle}
        onTransitionEnd={handleTransitionEnd}
        // The wrapper's width must be in pixels for accurate translation.
        style={{ width: `${slideCount * computedWidth}px` }}
      >
        {slides.map((child, index) => (
          <div
            key={index}
            style={{
              width: defaultWidth,
              height: defaultHeight,
              flexShrink: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <button css={[arrowButtonStyle, leftArrowStyle]} onClick={prevSlide}>
        <ArrowLeft size={24} />
      </button>
      <button css={[arrowButtonStyle, rightArrowStyle]} onClick={nextSlide}>
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default CollageSlider;
