import { useEffect, useReducer, useState } from "react";
import emptyCartSVG from "../Icons/empty-cart.svg";
import { Link } from "react-router-dom";
const emptyCart = emptyCartSVG;

const Categories = () => {
  return (
    <div id="categories-wrapper">
      <Link to={"/store"}>Store</Link>
      <div id="categories-container">
        <div className="category">
          Women
          <div className="subcategory">
            <Link to={"/store/womens-dresses"} id="womens-dresses">
              Dresses
            </Link>
            <Link to={"/store/womens-shoes"}>Shoes</Link>
            <Link to={"/store/tops"}>Tops</Link>
            <Link to={"/store/skincare"}>Skincare</Link>
          </div>
        </div>
        <div className="category">
          Men
          <div className="subcategory">
            <Link to={"/store/mens-shirts"}>Shirts</Link>
            <Link to={"/store/mens-shoes"}>Shoes</Link>
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
        <Link to={"/store/fragrances"}>
          <div className="category" id="perfumes">
            Perfumes
          </div>
        </Link>
      </div>
    </div>
  );
};

const ShoppingCart = ({ cartProducts, setCartProducts }) => {
  const [showCart, setShowCart] = useState("slide-backwards");
  let totalPrice = 0;

  if (cartProducts.length > 0) {
    for (const item of cartProducts) {
      totalPrice += item.price;
    }
  }
  const handleDelete = (title) => {
    setCartProducts((prevCart) => {
      const deleteItem = prevCart.filter((item) => item.title !== title);
      return deleteItem;
    });
  };

  const products = cartProducts.map((product) => {
    const { thumbnail, title, price, brand, id, amount } = { ...product };
    return (
      <div className="shopping-cart-item" key={id}>
        <img src={thumbnail} alt={title} />
        <p>{brand}</p>
        <p>{title}</p>
        <p>${price}</p>
        <p>{amount || 1}U</p>
        <button onClick={() => handleDelete(title)}>X</button>
      </div>
    );
  });

  const handleAnimation = () => {
    showCart === "slide-backwards"
      ? setShowCart("slide-fowards")
      : setShowCart("slide-backwards");
  };

  return (
    <div id="shopping-cart-wrapper">
      <div id="shopping-cart" className={showCart}>
        <button
          id="shopping-cart-btn"
          onClick={handleAnimation}
          className="slide-fowards"
        >
          <img src={emptyCart} alt="empty-cart"></img>
        </button>
        <div id="shopping-cart-item-container">{products || " "}</div>
        <div id="shopping-cart-actions-container">
          <Link to="/place-order">
            <button>Place Order</button>
          </Link>
          <button onClick={() => setCartProducts([])}>Clear Cart</button>
          <p>{totalPrice ? "Total: $" + totalPrice : ""}</p>
        </div>
      </div>
    </div>
  );
};

const Navbar = (props) => {
  return (
    <nav id="navbar">
      {/* <h1> - - - </h1> */}
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h2>::::FT</h2>
      </Link>
      <div id="search-bar">
        <input type="text"></input>
        <p>search</p>
      </div>
      <ul id="link-list">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>
          <Categories setNavigationFilter={props.setNavigationFilter} />
        </li>
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
      <ShoppingCart
        cartProducts={props.cartProducts}
        setCartProducts={props.setCartProducts}
      />
    </nav>
  );
};

export default Navbar;
