import '../styles/index.scss';
import '../styles/header.scss';
import '../styles/products-list.scss';
import '../styles/cart.scss';


import ProductData from './components/fetch-products.js';
import ProductsList from './components/products-list.js';

/**
 * Intialize product data and product list instances
 * **/

import Cart from './components/cart.js';
const cartInstance = new Cart();
cartInstance.render()


/**
 * Intialize product data and product list instances
 * **/

const productDataInstance = new ProductData();
const productsListInstance = new ProductsList();
productsListInstance.render();

/**
 * Fetch intial product data of page, and push data to state
 * 
 * **/

// Attach listeners to loadmore
const learnmorebtn = productsListInstance.element.querySelector('#load-more-btn')
learnmorebtn.addEventListener('click', (e)=> {
  e.preventDefault();
  
  // update page number and fetch next page
  productDataInstance.fetchData(productsListInstance.page+=1).then(res => {
    if(res.length === 0){
      learnmorebtn.insertAdjacentHTML('beforebegin', `<p>You've reached the end of listing. </p>`)
      learnmorebtn.disabled = true
      return
    }
    productsListInstance.pushProducts(res) 
  })

})