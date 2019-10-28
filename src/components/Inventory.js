import React from "react";
import AddItemForm from "./AddItemForm";
import Login from "./Login";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base"

class Inventory extends React.Component {

    static propTypes = {
        items: PropTypes.object,
        updateItem: PropTypes.func,
        removeItem: PropTypes.func,
        loadSampleMenu: PropTypes.func,
        addItem: PropTypes.func
    }

    constructor () {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, key) => {
        const item = this.props.items[key] 
        // taking a copy of the item and updating it with new data
        const updatedItem = {
            ...item,
            [e.target.name]:e.target.value
        }
        this.props.updateItem(key, updatedItem);
    }
    renderInventory =  (key) => {
        const item = this.props.items[key];
        return(
            <div className="item-edit" key={key}>
                <input type="text" name="name" value={item.name} placeholder="Item Name" onChange={(e) => {this.handleChange(e, key)}}/>
                <input type="text" name="price" value={item.price} placeholder="Item Price" onChange={(e) => {this.handleChange(e, key)}}/>
                <select type="text" name="status" value={item.status} placeholder="Item Status" onChange={(e) => {this.handleChange(e, key)}}>
                    <option value="available">Available!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={item.desc} placeholder="Item Desc" onChange={(e) => {this.handleChange(e, key)}}>

                </textarea>
                <input type="text" name="image" value={item.image} placeholder="Item Image" onChange={(e) => {this.handleChange(e, key)}}/>
                <button onClick={() => this.props.removeItem(key)}>❌ Remove Item</button>
            </div>
        )
    }

    authHandler = async (authData) => {
        console.log(authData);
        // look for the current cafe in the firebase database
            const cafe = await base.fetch(this.props.cafeId, { context: this });
        // claim if there is no owner
        if (!cafe.owner) {
            await base.post(`${this.props.cafeId}/owner`, { data: authData.user.uid })
        }
        // set the state of the inventory component to reflect the current user
    }
    
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    render() {
        return <Login authenticate={this.authenticate}/>
        return (
            <>
                <div className="inventory">
                    <h2>Inventory</h2>
                    {Object.keys(this.props.items).map(this.renderInventory)}
                    <AddItemForm addItem={this.props.addItem} />
                    <button onClick={this.props.loadSampleMenu}>Load Sample Menu</button>
                </div>
            </>
        );
    }
}

export default Inventory;
