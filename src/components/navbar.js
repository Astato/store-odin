import { useState } from "react";
import emptyCartSVG from "../Icons/empty-cart.svg";
import { Link } from "react-router-dom";

const emptyCart = emptyCartSVG;

const Categories = () => {
  return (
    <div id="categories-wrapper">
      Store
      <div id="categories-container">
        <div className="category" id="woman">
          Women
          <div className="subcategory">
            <p>Dresses</p>
            <p>Shoes</p>
            <p>Tops</p>
            <p>Skincare</p>
          </div>
        </div>
        <div className="category" id="men">
          Men
          <div className="subcategory">
            <p>Shirts</p>
            <p>Shoes</p>
          </div>
        </div>
        <div className="category" id="jewelry">
          Jewelry
          <div className="subcategory">
            <p>Women</p>
            <p>Men</p>
          </div>
        </div>
        <div className="category" id="accesories">
          Accesories
          <div className="subcategory">
            <p>Sunglasses</p>
            <p>Women's Bags</p>
            <p>Women's Watches</p>
            <p>Men's Watches</p>
          </div>
        </div>
        <div className="category" id="perfumes">
          Perfumes
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const [showCart, setShowCart] = useState("slide-backwards");

  const handleClick = () => {
    showCart === "slide-backwards"
      ? setShowCart("slide-fowards")
      : setShowCart("slide-backwards");
  };

  return (
    <div id="shopping-cart-wrapper">
      <div id="shopping-cart" className={showCart}>
        <button
          id="shopping-cart-btn"
          onClick={handleClick}
          className="slide-fowards"
        >
          <img src={emptyCart} alt="empty-cart"></img>
        </button>
        <p>hello</p>
        <p>hello</p>
        <button>Place Order</button>
        <button>Clear Cart</button>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav id="navbar">
      {/* <h1> - - - </h1> */}
      <h2>::::FT</h2>
      <div id="search-bar">
        <input type="text"></input>
        <p>search</p>
      </div>
      <ul id="link-list">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/store"}>
          <li>
            <Categories />
          </li>
        </Link>
        <Link to={"/contact"}>
          <li>Contact</li>
        </Link>
        <Link to={"/about"}>
          <li>About</li>
        </Link>
        <Link to={"/faq"}>
          <li>FAQ</li>
        </Link>
        <Link to={"/login"}>
          <li>Login</li>
        </Link>
      </ul>
      <ShoppingCart />
    </nav>
  );
};

export default Navbar;
