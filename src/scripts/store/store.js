import PubSub from "../lib/pubsub";
export default class Store {
  constructor(params) {

    let self = this;
    // setting default objects for actions, mutations and state
    self.actions = {};
    self.mutations = {};
    self.state = {};
    // status element to determine what object is doing at any given time
    self.status = 'resting';

    self.events = new PubSub();

    // search the passed params object to see if any actions or mutations were passed
    if (params.hasOwnProperty('actions')) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations;
    }

    // use proxy to track changes using traps
    self.state = new Proxy((params.state || {}), {
      // set trap to catch state object set operations
      set: function (state, key, value) {
        
        state[key] = value;
        
        console.log(`stateChange: ${key}: ${value}`);
        // publish stateChange event to PubSub
        self.events.publish('stateChange', self.state);
        
        // check is store is not running a mutation
        if (self.status !== 'mutation') {
          // warn developer because the state was probably updated manually
          console.warn(`You should use a mutation to set ${key}`);
        }
        
        self.status = 'resting';

        return true;
      }
    })
  }

  // dispatch calls our actions
  dispatch(actionKey, payload) {

    let self = this;

    // log error if no action is found 
    if(typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false
    }

    // start logging group
    
    // If mutation can be found then set status run it

    console.groupCollapsed(`ACTION: ${actionKey}`);

    self.status = 'action';

    self.actions[actionKey](self, payload);

    console.groupEnd();

    // end group

    return true;

  }

  // commit calls our mutations
  commit(mutationKey, payload){

    let self = this;


    if(typeof self.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    /**
     * If mutation can be found; set status, 
     * run it and get new state from the return value 
     **/
    
    self.status = 'mutation';
    
    let newState = self.mutations[mutationKey](self.state, payload);

    // take the new state and merge with existing state to get an up-to-date version of our state
    self.state = Object.assign(self.state, newState);

    return true;
  }

}