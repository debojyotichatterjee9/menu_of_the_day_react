import React from "react";
import { formatPrice } from "../helpers"

class Order extends React.Component {
    
    renderOrder = key => {
        const item = this.props.items[key];
        const count = this.props.order[key];

        if (!item || item.status === 'unavailable') {
            return <li key={key}>Sorry, {item ? item.name : 'item'} is no longer available.</li>
        }

        return (
            <li key={key}>
            <span>{count} ✖ {item.name} 👉 </span>    
                <span className="price">{formatPrice(count * item.price)}</span>   
            </li> 
        )
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const item = this.props.items[key];
            const count = this.props.order[key];
            const isAvailable = item && item.status === 'available';

            if (isAvailable) {
                return prevTotal + (count * item.price);
            }
            return prevTotal;
        }, 0);
        return (
            <>
                <div className="order-wrap">
                    <h2>Orders</h2>
                    <ul className="order">
                        {orderIds.map(this.renderOrder)}
                    </ul>
                    <div className="total">
                        Total:<strong>
                            {formatPrice(total)}
                        </strong>
                    </div>
                </div>
            </>
        );
    }
}

export default Order