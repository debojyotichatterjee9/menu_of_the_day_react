import React from "react";
import PropTypes from "prop-types";


class AddFishForm extends React.Component{
    
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();
    
    static propTypes={
        addFish: PropTypes.func
    };
    
    createFish = event =>{
       event.preventDefault(); //stopping the form from submitting
       const fish = {
        name: this.nameRef.value,
        price: parseFloat(this.priceRef.value), //changing the price into float type
        status: this.statusRef.value,
        desc: this.descRef.value,
        image: this.imageRef.value
       };
        console.log(fish);
        this.props.addFish(fish);
        //refreshing the form
        event.currentTarget.reset();
    };
    render(){
    return(
        <form className="fish-edit" onSubmit={this.createFish}>
            <input name="name" ref={(nameRef) => {this.nameRef=nameRef}}   type="text" placeholder ="Name" />
            <input name="price" ref={(priceRef) => {this.priceRef=priceRef}} type="text" placeholder ="Price" />
            <select name="status" ref={(statusRef) => {this.statusRef=statusRef}}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
            </select>
            <textarea name="desc" ref={(descRef) => {this.descRef=descRef}} placeholder ="Desc" ></textarea>
            <input name="image" ref={(imageRef) => {this.imageRef=imageRef}} type="text" placeholder ="Image" />
            <button type="submit">+ Add Fish</button>
        </form>
    );
}

}

export default AddFishForm;