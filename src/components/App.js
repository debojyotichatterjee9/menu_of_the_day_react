import React from "react";
import { Component } from "react";
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"

class App extends Component {Inventory
  render() {
    return (
    <>
      <div className="menu-of-the-day">
        <div className="menu">
          <Header tagline="Daily Fresh Menu"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    </>);
  }
}

export default App;
