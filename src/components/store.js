import React, { useEffect, useReducer, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import IMG from "./test-smarphone-photo.jpg";
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

const reducer = (state, action) => {
  if (action.type === "CLICKED") {
    console.log(action.type);
    return {
      ...state,
      id: action.id,
      description: "action.description",
      price: "action.price",
      img: "action.img",
      title: "action.title",
    };
  }
  if (action.type === "GOBACK") {
    return {
      ...state,
      id: "",
      description: "",
      price: "",
      img: "",
      title: "",
    };
  }
  throw new Error("No Matching action");
};

const defaultState = {
  id: "",
  description: "",
  price: "",
  img: "",
  title: "",
};

const Products = (props) => {
  const [products, dispatch] = useReducer(reducer, defaultState);
  let location = useLocation();
  console.log(props.priceSortSlider);

  // const getProducts = async () => {
  //   const response = await fetch(URL);
  //   const products = await response.json();
  //   console.log(products);
  // };

  // getProducts();

  useEffect(() => {}, [location]);

  if (products.id && location.pathname !== "/store") {
    return (
      <div>
        <Link to={"/store"}>
          <button onClick={() => dispatch({ type: "GOBACK" })}>GO BACK</button>
        </Link>
        This is a test component product page
      </div>
    );
  }

  // useEffect(() => {

  // },[])

  const handleClick = () => {
    console.log("click");
    dispatch({
      type: "CLICKED",
      id: "123",
    });
  };

  // if (products.id) {
  //   document.getElementById("sidebar").style.display = "none";
  //   return <div>this is the product page</div>;
  // }

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
    } = {
      ...element,
    };

    if (price > props.priceSortSlider) {
      return;
    }
    return (
      <div className="product-card" onClick={handleClick} key={id}>
        <Link to={"/store/" + title}>
          <img src={thumbnail} alt="phone" className="product-image"></img>
          <p>{title}</p>
          <p>{description}</p>
          <p>$ {price}</p>
          <button className="add-to-cart-btn">Add to cart</button>
        </Link>
      </div>
    );
  });

  return <div className="products-card-container">{productCard}</div>;
};

const Store = () => {
  const [priceSortSlider, setPriceSortSlider] = useState(20);

  return (
    <div id="store">
      <div id="sidebar">
        <select>
          <option>Filter</option>
          <option>Order by Highest</option>
          <option>Order by Lowest</option>
        </select>
        <p>Categories</p>
        <ul id="sidebar-categories">
          <li>Cellphones</li>
          <li>Laptops</li>
        </ul>
        <ul id="sort-price">
          <p>Sort by Price</p>
          <p>Up to: $ {priceSortSlider}</p>
          <input
            type="range"
            min={10}
            max={100}
            value={priceSortSlider}
            onChange={(e) => {
              setPriceSortSlider(e.target.value);
            }}
          ></input>
        </ul>
      </div>
      <Products priceSortSlider={priceSortSlider} />
      {/* <ProductDescriptionPage /> */}
    </div>
  );
};

export default Store;
