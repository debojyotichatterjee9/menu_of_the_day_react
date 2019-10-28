import React from "react"
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Item extends React.Component {

    static propTypes ={
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func
    }

    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    render() {
        const {image, name, price, desc, status} = this.props.details; // using the ES6 destructuring we can create the variables to be able to use them easily
        const isAvailable = status === 'available';
        return(
            <>
                <li className="menu-item">
                    <img src={image} alt={name}/>
                    <h3 className="item-name">
                        {name}
                        <span className="price">
                            {formatPrice(price)}
                        </span>
                    </h3>
                    <p>{desc}</p>
                    <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add to Cart': 'Sold Out'}</button>
                </li>
            </>
        )
    }
}

export default Item;
