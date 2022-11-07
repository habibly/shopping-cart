export default {
  /**
   * actionName(context, payload) {
   *  context.commit('actionKey', payload)
   * }
   **/

   setProducts(context, payload) {
    context.commit('setProducts', payload);
  },
  addToCart(context, payload) {
    context.commit('addToCart', payload);
  }
};