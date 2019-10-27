import React from "react";
import { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleMenu from "../sample-menu";
import Item from "./Item";
import base from "../base"

class App extends Component {
  state = {
    items: {},
    order: {}
  };

  // here we implement React Life Cycle Hooks 
  componentDidMount() { // invoked once immediately before the initial rendering occurs
    const { params } = this.props.match
    this.ref = base.syncState(`${params.cafeId}/items`, 
    {
      context: this,
      state: 'items'
    });
  }

  componentWillUnmount() { // Called immediately before a component is destroyed.
    base.removeBinding(this.ref);
  }

  addItem = item => {
    /*Note: we do not want to touch the existing state, instead make a copy of it  because it is cpnsidered to be a best practice
    to never reach the state and modify it directly. This is what is called a mutation in javascript. Mutations can cause issues
    performance of things updating out of order */
    //taking a copy of a existing state
    const items = { ...this.state.items };
    //add new item to the items variable
    items[`item${Date.now()}`] = item;

    //set the new items object to the state
    this.setState({
      items
    });
  };
  loadSampleMenu = () => {
    this.setState({ items: sampleMenu });
  };

  addToOrder = (key) => {
    // 1. taking a copy of the state
    const order = {...this.state.order};
    // 2. adding or updating the order (if the order already exists)
    order[key] = order[key] +1 || 1; // here it will check of the order[key] exists. it will add 1 to the value and if it doesn't exist then it will update the value as one
    // 3. calling setState to update the state of our object
    this.setState({order});
  }
  // TODO: need to add the tips comment here for the props and state concepts later
  render() {
    return (
      <>
        <div className="menu-of-the-day">
          <div className="menu">
            <Header tagline="Daily Fresh Menu" />
            <ul className="items">
              {/* below we had to pass the key 2 times as the key was not accesible otherwise, so we had to pass it as a prop (something other than key)explicitly  */}
              {Object.keys(this.state.items).map(key => <Item key={key} index={key} details={this.state.items[key]} addToOrder={this.addToOrder}/>)}
            </ul>
          </div>
          <Order items={this.state.items} order={this.state.order}/> {/* passing the items and the order state via props*/}
          <Inventory
            addItem={this.addItem}
            loadSampleMenu={this.loadSampleMenu}
          />
        </div>
      </>
    );
  }
}

export default App;
