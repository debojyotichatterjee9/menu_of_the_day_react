import React from "react";
import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";
import PropTypes from "prop-types";
import Login from "./Login.js";
import base, { firebaseApp } from "../base.js";
import firebase from "firebase";

class Inventory extends React.Component{

    static protoType={
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

        state={
            uid: null,
            owner: null
        }
        
        componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                this.authHandler({ user });
              }
            });
          }

    authHandler = async (authData) =>{
        console.log(authData);
        //checking the current store in firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        //claiming if there is no owner
        if(!store.owner){
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        };
        //setting the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid 
        });
       // console.log(authData);
    };

    authenticate= provider =>{
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        console.log('Logged Out!');
        await firebase.auth().signOut();
        this.setState({ uid: null});
    };

    render(){
        const logout = <button onClick={this.logout}>Log Out!</button>
        //checking if logged in
        if(!this.state.uid){
        return (<Login authenticate={this.authenticate}/>);
        }

        //checking if the user is not the owner of the store
        if(this.state.uid !== this.state.owner){

            return (<div><p>Sorry..You are the not the owner!</p>{logout}</div>);
        }
        
        return(
        <div className="inventory">
            <h2>Inventory</h2>
            {logout}
            {Object.keys(this.props.fishes).map(key => <EditFishForm key = {key} index ={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish}/>)}
            <AddFishForm addFish = {this.props.addFish} />
            <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
    );
}

}

export default Inventory;