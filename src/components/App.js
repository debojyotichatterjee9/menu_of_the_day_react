import React from "react";
import Header from "./Header.js";
import Inventory from "./Inventory.js";
import Order from "./Order.js";
import sampleFishes from "../sample-fishes.js";
import Fish from "./Fish.js";
import base from "../base.js";
import PropTypes from "prop-types";

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };
    static proTypes={
        match: PropTypes.object
    };
    componentDidMount(){
        const { params } = this.props.match;
        //reinstating the local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate(){
        //console.log(this.state.order);
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );        
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish = (fish) =>{
        //taking a copy of the existing state
        const fishes = { ...this.state.fishes };
        //adding the new fish to the fishes variable
        fishes[`fish${Date.now()}`] = fish; //date is to give a rand variable per milisecond
        //setting the new fishes object to state
        this.setState({
            fishes: fishes
        });
        console.log("Adding a fish!!");
    };
    
    updateFish = (key, updatedFish) =>{
        const fishes = { ...this.state.fishes}; //taking the copy of the current state
        fishes[key] = updatedFish; //updated the state here
        this.setState({ fishes });
        }

    deleteFish = (key) =>{
        const fishes = { ...this.state.fishes }; //taking a copy of the state
        //updating the state
        fishes[key] = null; 
        this.setState({fishes});
    }

    loadSampleFishes = () =>{
        this.setState({fishes: sampleFishes});
    };

    addToOrder = (key) =>{
        //taking a copy of state
        const order = { ...this.state.order };
        //add order or update the number in our order
        order[key] = order[key] + 1 || 1;
        //calling setState to update the state object
        this.setState({ order: order });
    };

    removeFromOrder = (key) =>{
        //taking a copy of state
        const order = { ...this.state.order };
        //remove the fish item from the order
        delete order[key];
        //calling setState to update the state object
        this.setState({ order: order });
    };

    render(){
    return(
        <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="Fresh Seafood Market"/>
        <ul className="fishes">
        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
        </ul>
        </div>
        <Order fishes = {this.state.fishes} order = {this.state.order} removeFromOrder={this.removeFromOrder}/> 
        <Inventory addFish = {this.addFish} 
                   updateFish = {this.updateFish} 
                   deleteFish = {this.deleteFish} 
                   loadSampleFishes = {this.loadSampleFishes} 
                   addToOrder = {this.addToOrder} 
                   fishes={this.state.fishes} 
                   storeId={this.props.match.params.storeId}/>
        </div>
    );
}
}

export default App;