import React from "react"
import { formatPrice } from "../helpers"

class Item extends React.Component {
    render() {
        const {image, name, price, desc, status} = this.props.details; // using the ES6 destructuring we can create the variables to be able to use them easily
        return(
            <>
                <li className="menu-item">
                    <img src={image} alt={name}/>
                    <h3 className="fish-name">
                        {name}
                        <span className="price">
                            {formatPrice(price)}
                        </span>
                    </h3>
                    <p>{desc}</p>
                    <button>Add to Cart</button>
                </li>
            </>
        )
    }
}

export default Item;