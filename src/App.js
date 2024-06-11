import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Store from "./components/store";
import About from "./components/about";
import Contact from "./components/contact";
import Login from "./components/login";
import Faq from "./components/faq";

const URL = "https://dummyjson.com/products?limit=0";

const Error = () => {
  return (
    <div>
      <h1>Page not Found</h1>
    </div>
  );
};

const PlaceOrder = ({ cartProducts }) => {
  const productsOrder = cartProducts.map((product) => {
    const { title, brand, thumbnail, price, amount } = { ...product };
    return (
      <div
        id="place-order-products-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          textAlign: "right",
          width: "40rem",
          backgroundColor: "white",
          margin: "1rem 0",
        }}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{ width: "60px", height: "60px" }}
        ></img>
        <p>{brand}</p>
        <p>
          {amount} Units, ${price}
        </p>
      </div>
    );
  });

  const handleSubmit = (e) => {
    return e.preventDefault;
  };

  return (
    <div id="place-order-wrapper">
      <div>
        <h1>Thank you for buying in Fashion Trends!</h1>
      </div>
      <h2>Order Details</h2>
      <div style={{ backgroundColor: "white", margin: "1rem" }}>
        {productsOrder}
      </div>

      <h2>Shipping Information</h2>
      <form onClick={handleSubmit}>
        <label>Full Name</label>
        <input type="text"></input>
        <label>Billing Adress</label>
        <input type="text"></input>
        <label>Shipping Adress</label>
        <input type="text"></input>
        <label>Email</label>
        <input type="email"></input>
      </form>
      <h2>Payment</h2>
      <form onClick={handleSubmit}>
        <select>
          <option>Select payment method</option>
          <option>Debit</option>
          <option>Credit Card</option>
        </select>
        <label>Card Number</label>
        <input type="text"></input>
        <label>Full Name</label>
        <input type="text"></input>
        <label>Expiration Date</label>
        <input type="text"></input>
        <label>CCV</label>
        <input type="text"></input>
      </form>
      <button>Place Order</button>
    </div>
  );
};

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [productsArray, setProductsArray] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch(URL);
      const products = await response.json();
      if (products) {
        const filter = products.products.filter(
          (product) =>
            product.category.match("women") ||
            product.category.match("men") ||
            product.category.match("fragrances") ||
            product.category.match("beauty") ||
            product.category.match("sunglases") ||
            product.category.match("top")
        );
        if (setProductsArray) {
          return setProductsArray(filter);
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (!productsArray || productsArray.length <= 1) {
      getProducts();
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar cartProducts={cartProducts} setCartProducts={setCartProducts} />
        <Routes>
          <Route path="/" element={<Home productsArray={productsArray} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/store"
            element={
              <Store
                setCartProducts={setCartProducts}
                cartProducts={cartProducts}
                productsArray={productsArray}
                setProductsArray={setProductsArray}
              />
            }
          />
          <Route
            path="place-order"
            element={<PlaceOrder cartProducts={cartProducts} />}
          ></Route>
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="faq" element={<Faq />} />
          <Route
            path="store/:category/:title"
            element={
              <Store
                setCartProducts={setCartProducts}
                cartProducts={cartProducts}
                productsArray={productsArray}
              />
            }
          ></Route>
          <Route
            path="/store/:category"
            element={
              <Store
                setCartProducts={setCartProducts}
                cartProducts={cartProducts}
                productsArray={productsArray}
                setProductsArray={setProductsArray}
              />
            }
          ></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
