import React, { useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import "../css/Preview.css";

import coverMatcha from "../assets/preview/cover_matcha.png";
import blankSpace from "../assets/preview/blank_space.png";
import designFirst from "../assets/preview/design_1.png";
import designSecond from "../assets/preview/design_2.png";
import designThird from "../assets/preview/design_3.png";
import designFourth from "../assets/preview/design_4.png";
import namePage from "../assets/preview/name_page.png";

const pages = [
  { image: coverMatcha, isCover: true },
  { image: blankSpace },
  { image: namePage },
  { image: designFirst },
  { image: designSecond },
  { image: designThird },
  { image: designFourth, isCover: true },
];

function Preview() {
  const [bookWidth, setBookWidth] = useState(575);
  const [bookHeight, setBookHeight] = useState(794);

  const calculateBookSize = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const A5_RATIO = 148 / 210; // Width / Height for a single page

    let calculatedHeight = viewportHeight * 0.85;
    let calculatedWidth = calculatedHeight * A5_RATIO;

    // If the book is too wide for the viewport, calculate based on width instead
    if (calculatedWidth * 2 > viewportWidth * 0.95) {
      calculatedWidth = (viewportWidth * 0.95) / 2;
      calculatedHeight = calculatedWidth / A5_RATIO;
    }

    setBookWidth(Math.floor(calculatedWidth));
    setBookHeight(Math.floor(calculatedHeight));
  }, []);

  useEffect(() => {
    calculateBookSize();
    window.addEventListener("resize", calculateBookSize);
    return () => {
      window.removeEventListener("resize", calculateBookSize);
    };
  }, []);

  return (
    <div className="preview-container">
      <HTMLFlipBook
        width={bookWidth}
        height={bookHeight}
        maxShadowOpacity={0.2}
        drawShadow={true}
        showCover={true}
        size="fixed"
        flippingTime={1000} // Slower animation
        useMouseEvents={true} // Re-enable mouse events
        usePortrait={false} // Always show two pages
        swipeThreshold={0.8}
        clickThreshold={50}
      >
        {pages.map((page, index) => (
          <div className="page" key={index}>
            <div className={`page-content ${page.isCover ? "cover" : ""}`}>
              <img
                src={page.image}
                alt={`Page ${index + 1}`}
                className="page-image"
              />
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default Preview;
