import React from "react";
import AddItemForm from "./AddItemForm";

class Inventory extends React.Component {
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
            </div>
        )
    }
    render() {
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
