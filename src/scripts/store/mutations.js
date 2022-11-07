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
  }
};