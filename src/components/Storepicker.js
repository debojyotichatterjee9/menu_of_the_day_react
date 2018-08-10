import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { getFunName } from '../helpers.js';
import PropTypes from "prop-types";

class Storepicker extends React.Component {
    
  static propTypes={
      history: PropTypes.object
    }; 
    myInput = React.createRef();//created a ref to grab the input value
    goToStore = event => {
    event.preventDefault(); //stops the form from default submitting
    console.log("Going to store..");
    //getting the text from that input
    const storeName = this.myInput.value;
    //change the page to /store/the input(whatever is the input)
    this.props.history.push(`/store/${storeName}`);
  };  
  render() {
      return (
        <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a store..</h2>
        <input
        type="text" 
        ref={(myInput => {this.myInput = myInput})}
        required placeholder="Store Name" 
        defaultValue={getFunName()}></input>
        <button type="submit">Visit Store</button>
        </form>
      );
    }
  }

  export default Storepicker;