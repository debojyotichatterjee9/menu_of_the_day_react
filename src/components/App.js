import React from "react";
import { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleMenu from "../sample-menu";
import Item from "./Item";

class App extends Component {
  state = {
    items: {},
    order: {}
  };

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
  // TODO: need to add the tips comment here for the props and state concepts later
  render() {
    return (
      <>
        <div className="menu-of-the-day">
          <div className="menu">
            <Header tagline="Daily Fresh Menu" />
            <ul className="fishes">
              {Object.keys(this.state.items).map(key => <Item key={key} details={this.state.items[key]}/>)}
            </ul>
          </div>
          <Order />
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
