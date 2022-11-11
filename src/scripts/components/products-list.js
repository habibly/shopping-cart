import Component from "../lib/component.js";
import store from "../store/index.js";

// Use fetch as regular and then use pub sub to add product to cart, remove product from cart, 

export default class ProductsList extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#products-list')
    })
    let self = this;
    self.offset = 0

    // define blank products array in state to avoid errors
    // store.state.products = []
  }
  pushProducts(data) {
    // update products in store
    store.dispatch('setProducts', data);
  }
  render() {
    let self = this;
    if (store.state.products.length === 0) {
      self.element.querySelector('.wrapper').innerHTML = 'There are no items in this listing'
      return
    }

    self.element.querySelector('.wrapper').innerHTML = store.state.products.map((x) => {
      let { id, title, description, price, brand, thumbnail, } = x;
      return `
      <article >
          <a href="#">
            <figure>
              <img src="${thumbnail}" alt="${title} by ${brand} - ${description}" title="${description}" width="260" height="232">
            </figure>
          </a>
          <div>
            <h2>${title}</h2>
            <b>$${price.toFixed(2)}</b>
          </div>
          <form data-type="add-to-cart-form">
            <input type="hidden" name="quantity" value="1">
            <input type="hidden" name="id" value="${id}">
            <input type="hidden" name="price" value="${price}">
            <input type="hidden" name="thumbnail" value="${thumbnail}">
            <input type="hidden" name="title" value="${title}">
            <button type="submit">Add To Cart</button>
          </form>
        </article>
      `
    }).join('')
  }
}