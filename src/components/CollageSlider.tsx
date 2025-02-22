/** @jsxImportSource @emotion/react */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface CollageSliderProps {
  children: React.ReactNode;
  slideWidth?: number; // width in pixels
  slideHeight?: number; // height in pixels
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

const CollageSlider: React.FC<CollageSliderProps> = ({
  children,
  slideWidth,
  slideHeight,
}) => {
  // Store the slides in state as an array (circular list)
  const originalSlides = React.Children.toArray(children);
  const [slides, setSlides] = useState(originalSlides);
  const slideCount = slides.length;

  // Default dimensions: 90% of viewport width, 70% of viewport height.
  const defaultWidth = slideWidth || Math.round(window.innerWidth * 0.9);
  const defaultHeight = slideHeight || Math.round(window.innerHeight * 0.7);
  const dimensions = { width: defaultWidth, height: defaultHeight };

  // offset controls the current translation (in pixels). Initially 0.
  const [offset, setOffset] = useState(0);
  // Flag to enable/disable transitions (disable during instantaneous jumps).
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // When offset changes, update the transform.
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = transitionEnabled
        ? "transform 0.3s ease"
        : "none";
      sliderRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [offset, transitionEnabled]);

  // Advance to next slide: animate offset from 0 to -width.
  const nextSlide = () => {
    setTransitionEnabled(true);
    setOffset(-dimensions.width);
  };

  // After next slide animation ends, remove the first slide and append it, then reset offset.
  const handleNextTransitionEnd = () => {
    setSlides(prev => {
      const newSlides = [...prev];
      const first = newSlides.shift();
      if (first !== undefined) {
        newSlides.push(first);
      }
      return newSlides;
    });
    setTransitionEnabled(false);
    setOffset(0);
    // Re-enable transition after a short delay.
    setTimeout(() => setTransitionEnabled(true), 50);
  };

  // For previous slide, move the last slide to the front then animate offset back to 0.
  const prevSlide = () => {
    setTransitionEnabled(false);
    setSlides(prev => {
      const newSlides = [...prev];
      const last = newSlides.pop();
      if (last !== undefined) {
        newSlides.unshift(last);
      }
      return newSlides;
    });
    setOffset(-dimensions.width);
    // Allow reflow, then animate back to 0.
    setTimeout(() => {
      setTransitionEnabled(true);
      setOffset(0);
    }, 50);
  };

  // Handle transition end event.
  const handleTransitionEnd = () => {
    if (offset === -dimensions.width) {
      handleNextTransitionEnd();
    }
  };

  // Use a ref to throttle wheel events so that only one slide change happens at a time.
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
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
      onWheel={handleWheel}
    >
      <div
        ref={sliderRef}
        css={slidesWrapperStyle}
        onTransitionEnd={handleTransitionEnd}
        style={{ width: `${slideCount * dimensions.width}px` }}
      >
        {slides.map((child, index) => (
          <div
            key={index}
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              flexShrink: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        css={[arrowButtonStyle, leftArrowStyle]}
        onClick={prevSlide}
      >
        <ArrowLeft size={24} />
      </button>
      <button
        css={[arrowButtonStyle, rightArrowStyle]}
        onClick={nextSlide}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default CollageSlider;
