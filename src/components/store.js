import React, { createContext, useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { reducer } from "./reducer";
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

  const handleAddToCart = (element) => {
    const elementToAdd = { ...element }; ///copy elemenet to not modify it object manipulation
    console.log(props.cartProducts, "cartproducts");
    if (props.cartProducts.length < 1) {
      elementToAdd.amount = 1;
      return props.setCartProducts([...props.cartProducts, elementToAdd]);
    }

    const checkCart = props.cartProducts.filter((added) => {
      if (added.title !== elementToAdd.title) {
        return false;
      } else {
        if (!added.amount) {
          added.amount = 2;
          added.price *= 2;
        } else {
          added.amount += 1;
          added.price += elementToAdd.price;
        }
        return added;
      }
    });
    console.log(" or here?");
    if (checkCart.length === 0) {
      return props.setCartProducts([...props.cartProducts, elementToAdd]);
    } else {
      return props.setCartProducts((prevCart) => {
        const updateCart = prevCart.map((item) => {
          if (item.title === checkCart[0].title) {
            return Object.assign({}, item, checkCart[0]);
          }
          return item;
        });
        return updateCart;
      });
    }
  };

  ////////////////////////////////////////////////

  if (products.id && location.pathname !== "/store") {
    const { id, title, brand, description, price, images, category } = {
      ...products,
    };

    if (!location.pathname.includes("/store/" + category + "/")) {
      dispatch({
        type: "GOBACK",
      });
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
          <button onClick={() => handleAddToCart(products)}>ADD TO CART</button>
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
        <Link
          to={"/store/" + category + "/" + title.split(" ").join("-")}
          key={"1" + id}
        >
          <p style={{ fontSize: "larger" }}>{brand}</p>
          <img src={thumbnail} alt="phone" className="product-image"></img>
          <p>{description}</p>
          <p>$ {price}</p>
        </Link>
        <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(element)}
        >
          Add to cart
        </button>
      </div>
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
        <div className="sidebar-filter">
          {currentCategory.split("-").join(" ")}
        </div>
      </Link>
    );
  });
  return <div> {itemsCategories}</div>;
};

const Store = ({ setCartProducts, cartProducts }) => {
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
        <Link to={"/store"}>
          <button style={{ marginTop: "1rem" }}>Reset</button>
        </Link>
        <p style={{ fontSize: "larger", borderBottom: "solid gray" }}>
          Categories
        </p>
        <div
          id="sidebar-categories-filter-container"
          style={{ borderBottom: "solid gray" }}
        >
          <SidebarFilter></SidebarFilter>
        </div>
        <div id="sort-price">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
      </div>
      <Products
        maxPriceSortSlider={maxPriceSortSlider}
        minPriceSortSlider={minPriceSortSlider}
        setStoreId={setStoreId}
        setCartProducts={setCartProducts}
        cartProducts={cartProducts}
      />
    </div>
  );
};

export default Store;
