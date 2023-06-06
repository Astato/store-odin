import React, { createContext, useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import reducer from "./reducer";
import data from "./products.json";

const URL = "https://dummyjson.com/products?limit=100";

const filteredProducts = data.products.filter(
  (element) =>
    element.category === "fragrances" ||
    element.category === "skincare" ||
    element.category === "sunglasses" ||
    element.category === "tops" ||
    element.category.match("women") ||
    element.category.match("men")
);

const maxPrice = Math.max(...filteredProducts.map((product) => product.price));
const minPrice = Math.min(...filteredProducts.map((product) => product.price));

const defaultState = {
  id: "",
  title: "",
  brand: "",
  description: "",
  price: "",
  images: "",
  category: "",
};

const Products = (props) => {
  const [products, dispatch] = useReducer(reducer, defaultState);
  const [showImage, setShowImage] = useState(null);
  const [dataRequest, setDataRequest] = useState(false);
  let location = useLocation();

  // const getProducts = async () => {
  //   const response = await fetch(URL);
  //   const products = await response.json();
  //   console.log(products);
  // };

  // getProducts();

  useEffect(() => {
    const renderTimeout = setTimeout(() => {
      setDataRequest(true);
    }, 1500);
    return () => clearTimeout(renderTimeout);
  }, [location]);

  ////////////////////////////////////////////////

  if (products.id && location.pathname !== "/store") {
    const { id, title, brand, description, price, images, category } = {
      ...products,
    };

    if (!location.pathname.includes("/store/" + category + "/")) {
      dispatch({
        type: "GOBACK",
      });
      console.log("test");
    }
    if (!location.pathname.includes(title.split(" ").join("-"))) {
      return;
    }

    const imagesComponent = images.map((image) => {
      return (
        <img
          src={image}
          key={"0" + id}
          onClick={() => setShowImage(image)}
        ></img>
      );
    });

    return (
      <div id="product-page-container">
        <Link
          to={"/store/" + category}
          onClick={() => {
            dispatch({ type: "GOBACK" });
            setDataRequest(true);
            props.setStoreId("store");
            setShowImage(null);
          }}
        >
          Return
        </Link>
        <div id="product-page">
          <p>{brand}</p>
          <div id="thumbnail-container">
            <img id="thumbnail" src={showImage || images[1]}></img>
          </div>
          <p>{title}</p>
          <p>{category}</p>
          <p>{description}</p>
          <p>$ {price}</p>
          <div id="images-container">{imagesComponent}</div>
        </div>
      </div>
    );
  }

  ////////////////////////////////////////////////

  const productCard = filteredProducts.map((element) => {
    const {
      id,
      title,
      brand,
      category,
      description,
      price,
      rating,
      thumbnail,
      images,
    } = {
      ...element,
    };

    const categoriesNavigation = location.pathname.split("/")[2];

    if (categoriesNavigation && categoriesNavigation !== category) {
      return;
    }
    // if (
    //   props.showCategory &&
    //   category !== props.showCategory &&
    //   location.pathname.includes(props.showCategory)
    // ) {
    //   return;
    // }

    if (price > props.maxPriceSortSlider || price < props.minPriceSortSlider) {
      return;
    }
    return (
      <Link
        to={"/store/" + category + "/" + title.split(" ").join("-")}
        key={"1" + id}
      >
        <div
          className="product-card"
          onClick={() =>
            setTimeout(() => {
              dispatch({
                type: "SHOWPRODUCT",
                id: id,
                title: title,
                brand: brand,
                category: category,
                description: description,
                images: images,
                price: price,
              });
              props.setStoreId("store-single-product");
            }, 1000)
          }
          key={"2" + id}
        >
          <p>{brand}</p>
          <img src={thumbnail} alt="phone" className="product-image"></img>
          <p>{description}</p>
          <p>$ {price}</p>
          <button className="add-to-cart-btn">Add to cart</button>
        </div>
      </Link>
    );
  });
  let productCount = 0;
  productCard.map((element) => {
    if (element) {
      productCount += 1;
    }
  });
  if (productCount === 0) {
    return <h1> Sorry, nothing to show...</h1>;
  }

  return (
    <div className="products-card-container">{dataRequest && productCard}</div>
  );
};

////////////////////////////////////////////////////////////////////////////////////

const SidebarFilter = () => {
  let currentCategory = null;
  const itemsCategories = filteredProducts.map((product) => {
    const { category, id } = { ...product };
    if (category === currentCategory) {
      return;
    }

    if (category !== currentCategory) {
      currentCategory = category;
    }
    return (
      <Link to={"/store/" + category} key={"5" + id}>
        <li className="sidebar-filter">
          {currentCategory.split("-").join(" ")}
        </li>
      </Link>
    );
  });
  return <div> {itemsCategories}</div>;
};

const Store = () => {
  const [maxPriceSortSlider, setMaxPriceSortSlider] = useState(maxPrice);
  const [minPriceSortSlider, setMinPriceSortSlider] = useState(minPrice);
  const [storeId, setStoreId] = useState("store");

  return (
    <div id={storeId}>
      <div id="sidebar">
        {/* <select>
          <option>Filter</option>
          <option>Order by Highest</option>
          <option>Order by Lowest</option>
        </select> */}
        <p>Categories</p>
        <Link to={"/store"}>
          <button>Reset</button>
        </Link>
        <ul id="sidebar-categories">
          <SidebarFilter></SidebarFilter>
        </ul>
        <ul id="sort-price">
          <li>
            <p>Sort by Price</p>
            <p>Up to: $ {maxPriceSortSlider}</p>
            <input
              type="range"
              min={minPriceSortSlider}
              max={maxPrice}
              value={maxPriceSortSlider}
              onChange={(e) => {
                setMaxPriceSortSlider(e.target.value);
              }}
            ></input>
          </li>
          <li>
            <p>More than: ${minPriceSortSlider}</p>
            <input
              type="range"
              min={minPrice}
              max={maxPriceSortSlider}
              value={minPriceSortSlider}
              onChange={(e) => {
                setMinPriceSortSlider(e.target.value);
              }}
            ></input>
          </li>
        </ul>
      </div>
      <Products
        maxPriceSortSlider={maxPriceSortSlider}
        minPriceSortSlider={minPriceSortSlider}
        setStoreId={setStoreId}
      />
    </div>
  );
};

export default Store;
