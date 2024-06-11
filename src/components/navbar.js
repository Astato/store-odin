import { useEffect, useState } from "react";
import emptyCartSVG from "../Icons/empty-cart.svg";
import filledCartSVG from "../Icons/filled-cart.svg";
import menuIcon from "../Icons/menu_icon.png";
import { Link } from "react-router-dom";
const emptyCart = emptyCartSVG;
const filledCart = filledCartSVG;

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
        <Link to={"/store/womens-jewellery"} className="category" id="jewelry">
          Jewellery
        </Link>
        <div className="category" id="accesories">
          Accesories
          <div className="subcategory">
            <Link to={"/store/sunglasses"}>Sunglasses</Link>
            <Link to={"/store/womens-bags"}>Women's Bags</Link>
            <Link to={"/store/womens-watches"}>Women's Watches</Link>
            <Link to={"/store/mens-watches"}>Men's Watches</Link>
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

const ShoppingCart = ({ cartProducts, setCartProducts, isScreenSmall }) => {
  const [showCart, setShowCart] = useState("");
  const [wrapperStyling, setWrapperStyling] = useState(null);
  const [cartImg, setCartImg] = useState(emptyCart);
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
    const { images, title, price, brand, id, amount } = { ...product };
    return (
      <div className="shopping-cart-item" key={id}>
        <img src={images[0]} alt={title} />
        <p>{brand}</p>
        <p>{title}</p>
        <p>${price}</p>
        <p>{amount || 1}U</p>
        <button onClick={() => handleDelete(title)}>X</button>
      </div>
    );
  });

  const showWrapper = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: "0",
    left: "0rem",
    backgroundColor: "black",
    justifyContent: "space-evenly",
    zIndex: "99",
  };

  const hideWrapper = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "0rem",
    left: "10rem",
    justifyContent: "space-evenly",
  };
  const handleAnimation = () => {
    ////slide-upwards hides it, slide-downwards shows it
    if (!isScreenSmall) {
      if (showCart === "" || showCart !== "slide-forwards") {
        setShowCart("slide-forwards");
      } else {
        setShowCart("slide-backwards");
      }
    } else {
      if (showCart === "" || showCart !== "mobile-show-cart") {
        setShowCart("mobile-show-cart");
        setWrapperStyling(showWrapper);
      } else {
        setShowCart("mobile-hide-cart");
        setWrapperStyling(hideWrapper);
      }
    }
  };

  useEffect(() => {
    if (cartProducts.length >= 1) {
      setCartImg(filledCart);
    }
    if (cartProducts.length === 0) {
      setCartImg(emptyCart);
    }

    if (isScreenSmall && document.getElementById("shopping-cart")) {
      const shoppingCart = document.getElementById("shopping-cart");
      shoppingCart.id = "shopping-cart-mobile";
      shoppingCart.setAttribute("class", "mobile-hide-cart");
      setWrapperStyling(hideWrapper);
    }

    if (!isScreenSmall && document.getElementById("shopping-cart-mobile")) {
      const shoppingCart = document.getElementById("shopping-cart-mobile");
      shoppingCart.classList.remove("mobile-show-cart");
      shoppingCart.id = "shopping-cart";
      setWrapperStyling(null);
    }
  }, [isScreenSmall, cartProducts]);

  return (
    <div id="shopping-cart-wrapper" style={wrapperStyling}>
      <div id="shopping-cart" className={showCart || "hidden"}>
        <button
          id="shopping-cart-btn"
          onClick={handleAnimation}
          className={showCart || "hidden"}
        >
          <img src={cartImg} alt="empty-cart"></img>
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
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [responsiveStyle, setResponsiveStyle] = useState("navbar");

  const handleClick = () => {
    if (isScreenSmall) {
      responsiveStyle === "navbar"
        ? setResponsiveStyle("navbar-menu-active")
        : setResponsiveStyle("navbar");
    } else {
      return;
    }
  };

  const handleOpenPage = () => {
    handleClick();
  };

  useEffect(() => {
    if (window.innerWidth < 950) {
      return setIsScreenSmall(true);
    }
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 950) {
      return setIsScreenSmall(true);
    } else {
      return setIsScreenSmall(false);
    }
  });
  return (
    <nav id={responsiveStyle}>
      {/* <h1> - - - </h1> */}
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h2>: : : : Fashion Trends</h2>
      </Link>
      {isScreenSmall && (
        <img id="menu-icon" src={menuIcon} alt="" onClick={handleClick}></img>
      )}
      <ul id="link-list">
        <Link to={"/"} onClick={handleOpenPage}>
          <li>Home</li>
        </Link>
        <li onClick={handleOpenPage}>
          <Categories
            setNavigationFilter={props.setNavigationFilter}
            onClick={handleOpenPage}
          />
        </li>
        <Link to={"/contact"} onClick={handleOpenPage}>
          <li>Contact</li>
        </Link>
        <Link to={"/about"} onClick={handleOpenPage}>
          <li>About</li>
        </Link>
        <Link to={"/faq"} onClick={handleOpenPage}>
          <li>FAQ</li>
        </Link>
        <Link to={"/login"} onClick={handleOpenPage}>
          <li>Login</li>
        </Link>
      </ul>
      <ShoppingCart
        cartProducts={props.cartProducts}
        setCartProducts={props.setCartProducts}
        isScreenSmall={isScreenSmall}
      />
    </nav>
  );
};

export default Navbar;
