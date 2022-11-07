import Component from "../lib/component.js";
import store from "../store/index.js";

// Use fetch as regular and then use pub sub to add product to cart, remove product from cart, 

export default class Cart extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#cart')
    })
    let self = this;
    
    // toggle cart display
    window.addEventListener('click', (e)=> {
      if(e.target.dataset.type === 'cart-toggle'){
        e.preventDefault()
        self.toggleCartDisplay()
      }
    })

    window.addEventListener('submit', (e)=>{
      if(e.target.dataset.type === 'add-to-cart-form'){
        e.preventDefault()

        let formData = new FormData(e.target)
        self.addToCart(formData)
      }

    })

    store.state.cart = JSON.parse(localStorage.getItem('cartItems')) || []

  }
  toggleCartDisplay(){
    let self = this;
    if(self.element.style.display === 'none'){
      self.element.style.display = 'block';
      document.body.style.overflowY = 'hidden';

    }else {
      self.element.style.display = 'none'
      document.body.style.overflowY = 'auto'
    }
  }
  addToCart(formData){
    let self = this;

    var formObject = {};
    formData.forEach((value, key) => formObject[key] = value);
    
    store.dispatch('addToCart', formObject)

    self.toggleCartDisplay()
  }
  render() {
    let self = this;

    self.element.innerHTML = `
      <div class="wrapper">
        <div class="cart-header"><h3>Cart</h3><a href="#" data-type="cart-toggle">X</a></div>
        <div class="cart-body"></div>
      </div>
      `

    let cartBody = self.element.querySelector('.cart-body')

    if(store.state.cart.length === 0) {
      cartBody.innerHTML = `
        <p> You cart is empty. Add some products from the list</p>
      `
      return;
    }

    cartBody.innerHTML = store.state.cart.map((x) => {
      return `
        <pre>${JSON.stringify(x, null, "  ")}</pre>
      `
    }).join('')
  }
}