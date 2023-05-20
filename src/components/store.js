import { useEffect, useState } from 'react'
import IMG from './test-smarphone-photo.jpg'
const URL = 'https://dummyjson.com/products/categories'



const Products = () => {
  return (
    <div className='products-card-container'>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
      <div className='product-card'>
        <img src={IMG} alt='phone' className='product-image'></img>
        <p>title</p>
        <p>Description</p>
        <p>$ Price</p>
      </div>
    </div>
  )
}




const Store = () => {
const [priceSort, setPriceSort] = useState(20)

// const getProducts = async () => {
//   const response = await fetch(URL)
//   const products = await response.json();
//   console.log(products)
// }

// getProducts()
// useEffect(() => {

// },[])

return (
  <div id='store'>
    <div id='sidebar'>
      <select>
        <option>Filter</option>
        <option>Order by Highest</option>
        <option>Order by Lowest</option>
      </select>
      <p>Categories</p>
      <ul id='sidebar-categories'>
        <li>Cellphones</li>
        <li>Laptops</li>
      </ul>
      <ul id='sort-price'>
        <p>Sort by Price</p>
        <p>Up to: $ {priceSort}</p>
        <input type='range' min={'0'} max={100} value={priceSort} onChange={(e) => {setPriceSort(e.target.value)}}></input>
      </ul>
    </div>
    <Products/>
  </div>
)
}

export default Store