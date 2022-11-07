import '../styles/index.scss';
import '../styles/header.scss';
import '../styles/products-list.scss';


import ProductsList from './components/products-list.js';


/**
 * Intialize product data instance
 * **/

const productsListInstance = new ProductsList();
productsListInstance.render();

