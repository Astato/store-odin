import React, { useEffect, useState } from 'react'

const Home = () => {

const handleScroll = (side) => {  
  const home = document.getElementById('home')
  const scrollPosition = home.scrollLeft;
  const scrollWidth = home.scrollWidth
  const sliderChilds = document.getElementById('featured-content-wrapper').childElementCount;

  if (side === 'left') {
    const scrollLength = (scrollWidth/sliderChilds) + scrollPosition
    home.scrollTo({left:scrollLength, behavior: 'smooth'})
  }
  if (side === 'right') {
    const scrollLength = (scrollWidth/sliderChilds) - scrollPosition
    home.scrollTo({left:-scrollLength, behavior: 'smooth'})
  }
  if(!side){
    const scrollLength = (scrollWidth/sliderChilds)
    home.scrollTo({left:scrollLength, behavior: 'smooth'})
  }
}
window.addEventListener('resize', () => {
  handleScroll('')
})


  ///on hgome lest place some featured products with a nice scrolling and styling
  return(
    <div id='home'>
      <div id='slider-arrows-wrapper'>
        <button id='prev-featured-button' className='slider-arrows'
        onClick={() => handleScroll('right')}>prev</button>
        <p id='slider-element-indicator' style={{color:'white'}}>******</p>
        <button id='next-featured-button' className='slider-arrows'
        onClick={() => handleScroll('left')}>next</button>
      </div>
      <div id='featured-content-wrapper'>
        <div  className='featured-content'>
          <p>This is home page</p>
          <p>this another element</p>
          </div>
          <div  className='featured-content'>
          <p>This is home page2</p>
          <p>this another element2</p>
          </div>
          <div  className='featured-content'>
          <p>This is home page3</p>
          <p>this another element3</p>
          </div>
          <div  className='featured-content'>
          <p>This is home page4</p>
          <p>this another element4</p>
          </div>
          <div  className='featured-content'>
          <p>This is home page4</p>
          <p>this another element4</p>
          </div>
      </div>
    </div>
  )
}

export default Home;