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
    // setting the state initially to null
    state = {
        uid: null,
        owner: null,
    }

    /* below we are checking after every page load is the user is logged in or authenticated
    then calling the authHandler and the passing the user data in it to do the checks reqd */
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user})
            }
        });
    }

    authHandler = async (authData) => {
        console.log(authData);
        // look for the current cafe in the firebase database
            const cafe = await base.fetch(this.props.cafeId, { context: this });
        // claim if there is no owner
        if (!cafe.owner) {
            await base.post(`${this.props.cafeId}/owner`, { data: authData.user.uid })
            await base.post(`${this.props.cafeId}/emailId`, { data: authData.user.email })
            await base.post(`${this.props.cafeId}/name`, { data: authData.user.displayName })
            // await base.post(`${this.props.cafeId}/providerId`, { data: authData.user.providerData.providerId })
        }
        // setting the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: cafe.owner || authData.user.uid,
        })
    }
    
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    logout = async () => {
        console.warn(`Logging Out!`);
        await firebase.auth().signOut();
        this.setState({uid: null});
    }

    render() {

        const logoutButton = <button onClick={this.logout}>Log Out!</button>

        // checking if user logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }
        // checking if the logged in user is the owner of the store
        if (this.state.uid != this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner of this Cafe!!</p>
                    {logoutButton}
                </div>
            )
        }

        // rendering the inventory after authentication check
        return (
            <>
                <div className="inventory">
                    <h2>Inventory</h2>
                    {logoutButton}
                    {Object.keys(this.props.items).map(this.renderInventory)}
                    <AddItemForm addItem={this.props.addItem} />
                    <button onClick={this.props.loadSampleMenu}>Load Sample Menu</button>
                </div>
            </>
        );
    }
}

export default Inventory;
