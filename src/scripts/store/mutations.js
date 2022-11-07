export default {
  /***
   * mutationKey(state, payload) {
   *   do something here
   *  return state;
   * }
   */
  setProducts(state, payload) {
    state.products.push(...payload);
    return state;
  },

  addToCart(state, payload) {

    let selectedItem = payload;
    let search = state.cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
      state.cart.push(payload);
    } else {
      search.quantity = `${Number(search.quantity) + 1}`
    }

    localStorage.setItem('cartItems', JSON.stringify(state.cart))
    return state;
  },

  removeFromCart(state, payload) {

    let selectedItemId = payload;
    state.cart = state.cart.filter((x) => x.id !== selectedItemId);

    localStorage.setItem('cartItems', JSON.stringify(state.cart))
    return state;
  }
};