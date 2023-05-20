import { useState } from 'react'
import emptyCartSVG from '../Icons/empty-cart.svg'

const emptyCart = emptyCartSVG

const Categories = () => {
  return(
    <div id='categories-wrapper'>
      Store
      <div id='categories-container'>
        <div className='category' id='woman'>Women
          <div className='subcategory'>
            <p>Dresses</p>
            <p>Shoes</p>
            <p>Tops</p>
            <o>Skincare</o>
          </div>
        </div>
        <div className='category' id='men'>Men
          <div className='subcategory'>
            <p>Shirts</p>
            <p>Shoes</p>
          </div>
        </div>
        <div className='category' id='jewelry'>Jewelry
          <div className='subcategory'>
            <p>Women</p>
            <p>Men</p>
          </div>
        </div>
        <div className='category' id='perfumes'>Perfumes
        </div>
        <div className='category' id='accesories'>Accesories
          <div className='subcategory'>
            <p>Sunglasses</p>
            <p>Women's Bags</p>
            <p>Women's Watches</p>
            <o>Men's Watches</o>
          </div>
        </div>
      </div>
    </div>
  )
}



const ShoppingCart = () => {
  const [showCart, setShowCart] = useState('slide-backwards')

  const handleClick = () => {
    showCart === 'slide-backwards' ? setShowCart('slide-fowards') :
    setShowCart('slide-backwards')
  }

  return(
    <div id='shopping-cart-wrapper'>
      <div id='shopping-cart' className={showCart} >
        <button id='shopping-cart-btn' onClick={handleClick} className='slide-fowards' ><img src={emptyCart} alt='empty-cart'></img></button>
        <p>hello</p>
        <p>hello</p>
        <button>Place Order</button>
        <button>Clear Cart</button>
      </div>
    </div>
  )
}



const Navbar = () => {

  return(
    <nav id='navbar'>
      <h2>Title</h2>
      <div id='search-bar'>
        <input type='text'></input>
        <p>search icon + link</p>
      </div>
      <ul id='link-list'>
        <li>Home</li>
        <li><Categories/></li>
        <li>Contact</li>
        <li>About us</li>
        <li>FAQ</li>
        <li>Login / Sing up</li>
      </ul>
      <ShoppingCart/>
    </nav>
  )
}




export default Navbar