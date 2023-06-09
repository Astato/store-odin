import React, { useEffect, useState } from "react";
import { filteredProducts } from "./store";
import arrowForwards from "../Icons/arrow_forward.png";

const Home = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const featuredProducts = filteredProducts.map((product) => {
    const { brand, stock, thumbnail, discountPercentage, title, price } = {
      ...product,
    };
    if (product.discountPercentage > 17) {
      const originalPrice = price / (1 - discountPercentage / 100);
      return (
        <div className="featured-content-item-container">
          <div>
            <img className="thumbnail" src={thumbnail}></img>
          </div>
          <div className="featured-content-info">
            <h2>
              {brand}, {title}
            </h2>
            <p>
              Before: $ {Math.floor(originalPrice)}
              <h3>-%{Math.floor(discountPercentage)}</h3>
            </p>

            <div>
              NOW AT ONLY : <p>${price}</p> (Only {stock} units left!!){" "}
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
      <li className="slider-position-indicators" id={index}>
        {" "}
      </li>
    );
  });

  const handleScroll = (side) => {
    const home = document.getElementById("home");
    if (!home) {
      return;
    }
    if (side === "left" && currentPosition === 0) {
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
      home.scrollTo({ left: scrollLength, behavior: "smooth" });
      setCurrentPosition((prev) => prev + 1);
    }
    if (side === "left") {
      const scrollLength = scrollWidth / sliderChilds - scrollPosition;
      home.scrollTo({ left: -scrollLength, behavior: "smooth" });
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
  }, [currentPosition]);

  window.addEventListener("resize", () => {
    handleScroll("");
    document.getElementById("0").style.color = "#a5875f";
  });

  ///on hgome lest place some featured products with a nice scrolling and styling
  return (
    <div id="home">
      <div id="slider-arrows-wrapper">
        <div className="slider-arrows">
          <img
            src={arrowForwards}
            alt="prev"
            id="prev-featured-arrow"
            onMouseUp={() => handleScroll("left")}
          ></img>
        </div>
        <div id="slider-element-indicator">{sliderIndicatior}</div>
        <div className="slider-arrows">
          <img
            src={arrowForwards}
            alt="next"
            id="next-featured-arrow"
            onMouseUp={() => handleScroll("right")}
          ></img>
        </div>
      </div>
      <div id="featured-content-wrapper">{featuredProducts}</div>
    </div>
  );
};

export default Home;
