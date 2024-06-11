import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { reducer } from "./reducer";

export const filteredProducts = (data) => {
  const filtered = data.filter(
    (element) =>
      element.category === "fragrances" ||
      element.category === "skincare" ||
      element.category === "sunglasses" ||
      element.category === "tops" ||
      element.category.match("women") ||
      element.category.match("men")
  );
  return filtered;
};

const defaultState = {
  id: "",
  title: "",
  brand: "",
  description: "",
  price: "",
  images: "",
  category: "",
};

const Products = ({
  cartProducts,
  setCartProducts,
  setStoreId,
  minPriceSortSlider,
  maxPriceSortSlider,
  productsArray,
}) => {
  const [products, dispatch] = useReducer(reducer, defaultState);
  const [showImage, setShowImage] = useState(null);
  const [dataRequest, setDataRequest] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const renderTimeout = setTimeout(() => {
      setDataRequest(true);
    }, 2000);
    return () => clearTimeout(renderTimeout);
  }, [location]);

  const handleAddToCart = (element) => {
    const elementToAdd = { ...element }; ///copy elemenet to not modify it object manipulation
    if (cartProducts.length < 1) {
      elementToAdd.amount = 1;
      return setCartProducts([...cartProducts, elementToAdd]);
    }

    const checkCart = cartProducts.filter((added) => {
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
    if (checkCart.length === 0) {
      return setCartProducts([...cartProducts, elementToAdd]);
    } else {
      return setCartProducts((prevCart) => {
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

    let idImgNum = 0;
    const imagesComponent = images.map((image) => {
      idImgNum++;
      return (
        <img
          src={image}
          key={id + idImgNum.toString()}
          alt={title}
          onClick={() => setShowImage(image)}
        />
      );
    });

    return (
      <div id="product-page-container">
        <Link
          to={"/store/" + category}
          onClick={() => {
            dispatch({ type: "GOBACK" });
            setDataRequest(true);
            setStoreId("store");
            setShowImage(null);
          }}
        >
          Return
        </Link>
        <div id="product-page">
          <p style={{ fontWeight: "bolder", fontSize: "30px", margin: 0 }}>
            {brand}
          </p>
          <div id="thumbnail-container">
            <img
              id="thumbnail"
              alt={brand}
              src={showImage || images[1] || images[0]}
            ></img>
          </div>
          <p style={{ fontWeight: "bolder", fontSize: "20px" }}>{title}</p>
          <div style={{ maxWidth: "70%" }}>
            <p>{description}</p>
          </div>
          <p>$ {price}</p>
          <button onClick={() => handleAddToCart(products)}>ADD TO CART</button>
          <div id="images-container">{imagesComponent}</div>
          <div className="reviews-contaier"></div>
        </div>
      </div>
    );
  }

  if (!dataRequest) {
    return <p>Loading...</p>;
  }

  const productCard = productsArray.map((element) => {
    const {
      id,
      title,
      brand,
      category,
      description,
      price,
      thumbnail,
      images,
    } = {
      ...element,
    };
    const categoriesNavigation = location.pathname.split("/")[2];

    if (categoriesNavigation && categoriesNavigation !== category) {
      return null;
    }

    if (price > maxPriceSortSlider || price < minPriceSortSlider) {
      return null;
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
            setStoreId("store-single-product");
          }, 2000)
        }
        key={"2" + id}
      >
        <Link
          to={"/store/" + category + "/" + title.split(" ").join("-")}
          key={"1" + id}
        >
          <p style={{ fontSize: "larger" }}>{brand}</p>
          <img src={thumbnail} alt={title} className="product-image"></img>
          <p>{title}</p>
          <p
            style={{
              boxShadow: "0 0 3px 1px gray",
              width: "fit-content",
              margin: "1rem auto",
              padding: ".5rem 1rem",
              fontSize: "18px",
            }}
          >
            $ {price}
          </p>
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
    return productCard;
  });
  if (productCount === 0) {
    return <h1> Sorry, nothing to show...</h1>;
  }

  return (
    <div className="products-card-container">{dataRequest && productCard}</div>
  );
};

const Store = ({
  setCartProducts,
  cartProducts,
  setProductsArray,
  productsArray,
}) => {
  const [maxPriceSortSlider, setMaxPriceSortSlider] = useState(0);
  const [minPriceSortSlider, setMinPriceSortSlider] = useState(0);
  const [storeId, setStoreId] = useState("store");
  const currentCategory = new Set();
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    if (productsArray) {
      const getMaxPrice = Math.max(
        ...productsArray.map((product) => product.price)
      );
      const getMinPrice = Math.min(
        ...productsArray.map((product) => product.price)
      );
      setMaxPriceSortSlider(getMaxPrice);
      setMinPriceSortSlider(getMinPrice);
      setMaxPrice(getMaxPrice);
      setMinPrice(getMinPrice);
    }
  }, [productsArray]);

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
        <p id="categories-title">Categories</p>
        <div
          id="sidebar-categories-filter-container"
          style={{ borderBottom: "solid gray" }}
        >
          {productsArray.map((product, index) => {
            const { category } = { ...product };
            if (currentCategory.has(category)) {
              return null;
            } else {
              currentCategory.add(category);
              return (
                <Link key={index} to={"/store/" + category}>
                  <div className="sidebar-filter">
                    {category.split("-")[0]
                      ? category.split("-").map((string) => string)
                      : category}
                  </div>
                </Link>
              );
            }
          })}
        </div>
        {maxPriceSortSlider > 0 && maxPrice > 0 && (
          <div id="sort-price">
            <div>
              <p>Sort by Price</p>
              <p>Up to: $ {maxPriceSortSlider}</p>
              <input
                type="range"
                min={minPrice}
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
                max={maxPrice}
                value={minPriceSortSlider}
                onChange={(e) => {
                  setMinPriceSortSlider(e.target.value);
                }}
              ></input>
            </div>
          </div>
        )}
      </div>
      <Products
        maxPriceSortSlider={maxPriceSortSlider}
        minPriceSortSlider={minPriceSortSlider}
        setProductsArray={setProductsArray}
        productsArray={productsArray}
        setStoreId={setStoreId}
        setCartProducts={setCartProducts}
        cartProducts={cartProducts}
      />
    </div>
  );
};

export default Store;
