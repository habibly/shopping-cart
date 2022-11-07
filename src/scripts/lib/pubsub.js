export default class PubSub {
  /**
   * Initialize events object in constructor before any other methods are instantiated
   **/
  constructor() {
    this.events = {};
  }

  /**
   * subscribe method takes in unique event name as string, and a callback function
   **/

  subscribe(event, callback) {

    let self = this;

    // Create event with blank array if there are no matching events
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }

    // Push callback to event array
    return self.events[event].push(callback);
  }

  /**
   * publish method takes in event name of type string and data as argument
   **/

  publish(event, data = {}) {

    let self = this;

    // check if this event exists in our events collection if not then return with empty array
    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    // Loop through each callback and pass data to it
    return self.events[event].map(callback => callback(data));
  }
}