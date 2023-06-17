import React, { useEffect, useRef, useState } from "react";
import { filteredProducts } from "./store";
import arrowForwards from "../Icons/arrow_forward.png";

const Home = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [isWaitingRight, setIsWaitingRight] = useState(0);
  const [isWaitingLeft, setIsWaitingLeft] = useState(0);
  const [autoclick, setAutoclick] = useState(true);
  const clickTimerRef = useRef(null);

  const featuredProducts = filteredProducts.map((product) => {
    const { brand, stock, thumbnail, discountPercentage, title, price, id } = {
      ...product,
    };
    if (product.discountPercentage > 17) {
      const originalPrice = price / (1 - discountPercentage / 100);
      return (
        <div className="featured-content-item-container" key={id}>
          <div>
            <img className="thumbnail" src={thumbnail}></img>
          </div>
          <div className="featured-content-info">
            <p className="product-title">
              {brand}, {title}
            </p>
            <p className="old-price-title">
              <span className="discount-percentage-title">
                -%{discountPercentage.toFixed()}
              </span>
              Before: $
              <span style={{ textDecoration: "line-through" }}>
                {Math.floor(originalPrice)}
              </span>
            </p>

            <div className="offer-title">
              <p className="new-price-title">NOW: ${price}</p> (Only {stock}{" "}
              units left!!){" "}
            </div>
          </div>
        </div>
      );
    } else {
      return;
    }
  });

  const numberOfProducts = featuredProducts
    .filter((item) => {
      if (item) {
        return true;
      }
    })
    .map((item) => {
      if (item) {
        return true;
      } else {
        return;
      }
    });

  const sliderIndicatior = numberOfProducts.map((Element, index) => {
    return (
      <li className="slider-position-indicators" id={index} key={index + "0"}>
        &nbsp;&nbsp;
      </li>
    );
  });

  const handleScroll = (side) => {
    const home = document.getElementById("home");
    if (!home) {
      return;
    }
    if (side === "left" && currentPosition === 0) {
      setIsWaitingLeft(99);
      return;
    }

    if (side === "right" && currentPosition === numberOfProducts.length - 1) {
      return handleScroll("");
    }

    const scrollPosition = home.scrollLeft;
    const scrollWidth = home.scrollWidth;
    const sliderChilds = document.getElementById(
      "featured-content-wrapper"
    ).childElementCount;

    if (side === "right") {
      const scrollLength = scrollWidth / sliderChilds + scrollPosition;
      home.scrollTo({ left: scrollLength - 7, behavior: "smooth" });
      setCurrentPosition((prev) => prev + 1);
    }
    if (side === "left") {
      const scrollLength = scrollWidth / sliderChilds - scrollPosition;
      home.scrollTo({ left: -scrollLength, behavior: "smooth" });
      setIsWaitingLeft(-1);
      setCurrentPosition((prev) => prev - 1);
    }
    if (!side) {
      home.scrollTo({ left: 0, behavior: "smooth" });
      setCurrentPosition(0);
    }

    const indicators = document.getElementsByClassName(
      "slider-position-indicators"
    );
    Array.from(indicators).forEach((Element) => {
      if (Element.style.color !== "white") {
        Element.style.color = "white";
      }
    });
  };

  useEffect(() => {
    if (document.getElementById(currentPosition.toString())) {
      const indicator = document.getElementById(currentPosition.toString());
      indicator.style.color = "#a5875f";
    }
    setWrapperWidth(numberOfProducts.length * 100 + "%");

    const timer = setTimeout(() => {
      if (isWaitingLeft < 0) {
        setIsWaitingLeft(99);
      } else {
        setIsWaitingRight(99);
      }
    }, 500);

    if (autoclick) {
      clickTimerRef.current = setTimeout(() => {
        handleScroll("right");
      }, 3000);
    }
    return () => {
      clearTimeout(clickTimerRef.current);
      clearTimeout(timer);
    };
  }, [currentPosition, autoclick]);

  window.addEventListener("resize", () => {
    handleScroll("");
    if (document.getElementById("0")) {
      document.getElementById("0").style.color = "#a5875f";
    }
  });

  ///on hgome lest place some featured products with a nice scrolling and styling
  return (
    <div id="home">
      <h1 style={{ color: "white" }}>:::: Fashion Trends</h1>
      <div
        id="slider-arrows-wrapper"
        onMouseEnter={() => setAutoclick(false)}
        onMouseLeave={() => setAutoclick(true)}
      >
        <div className="slider-arrows" style={{ zIndex: isWaitingLeft }}>
          <img
            src={arrowForwards}
            alt="prev"
            id="prev-featured-arrow"
            onMouseUp={() => {
              handleScroll("left");
            }}
          ></img>
        </div>
        <div id="slider-element-indicator">{sliderIndicatior}</div>
        <div className="slider-arrows" style={{ zIndex: isWaitingRight }}>
          <img
            src={arrowForwards}
            alt="next"
            id="next-featured-arrow"
            onMouseUp={() => {
              handleScroll("right");
              setIsWaitingRight(-1);
            }}
          ></img>
        </div>
      </div>
      <div id="featured-content-wrapper" style={{ minWidth: wrapperWidth }}>
        {featuredProducts}
      </div>
    </div>
  );
};

export default Home;
