/** @jsxImportSource @emotion/react */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface CollageSliderProps {
  children: React.ReactNode;
  slideWidth?: string;
  slideHeight?: string;
}

const outerSliderContainerStyle = css`
  position: relative;
  padding: 2rem 60px;
  box-sizing: border-box;
  border-top: 2px solid rgba(229, 46, 113, 0.5);
  border-bottom: 2px solid rgba(229, 46, 113, 0.5);
`;

const sliderContainerStyle = css`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
`;

const slidesWrapperStyle = css`
  display: flex;
  transition: transform 0.3s ease;
  user-select: none;
`;

const arrowButtonStyle = css`
  position: absolute;
  top: 20vh;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  color: var(--foreground); /* use a theme variable */
  font-family: var(
    --font-righteous
  ); /* if you want consistency with your headings */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s ease;

  &:hover {
    color: var(--foreground);
    transform: scale(1.1);
  }
`;

const leftArrowStyle = css`
  left: 0;
`;

const rightArrowStyle = css`
  right: 0;
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
  const defaultWidth = slideWidth || "90vh";
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

  // Offset (in pixels) controls the current slide translation.
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
    <div css={outerSliderContainerStyle}>
      <div
        css={sliderContainerStyle}
        style={
          {
            width: defaultWidth,
            // Remove minHeight and only set the CSS variable for base slide height
            "--slide-height": defaultHeight,
          } as React.CSSProperties
        }
        onWheel={handleWheel}
      >
        <div
          ref={sliderRef}
          css={slidesWrapperStyle}
          onTransitionEnd={handleTransitionEnd}
          style={{ width: `${slideCount * computedWidth}px` }}
        >
          {slides.map((child, index) => (
            <div
              key={index}
              style={{
                width: defaultWidth,
                // Remove minHeight so the slide grows naturally
                flexShrink: 0,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <button css={[arrowButtonStyle, leftArrowStyle]} onClick={prevSlide}>
        <ArrowLeft size={24} weight="duotone" />
      </button>
      <button css={[arrowButtonStyle, rightArrowStyle]} onClick={nextSlide}>
        <ArrowRight size={24} weight="duotone" />
      </button>
    </div>
  );
};

export default CollageSlider;
