import Store from "../store/store.js";

export default class Component {
  constructor(props = {}) {
    let self = this;

    /**
     * Check if we have a render method, if this Component class is
     * the parent of another class then that will likely have its own
     * method for render. If there is no method set, we create empty 
     * method to prevent things from breaking.
     **/

    this.render = this.render || function () {};

    // Check if store prop is an instance of Store class
    if(props.store instanceof Store) {
      
      // Subscribe to global stateChange event so our object can react
      props.store.events.subscribe('stateChange', () => self.render());
    }

    if(props.hasOwnProperty('element')) {
      this.element = props.element;
    }
  }
}