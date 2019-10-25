import React from "react";
import { formatPrice } from "../helpers"

class Order extends React.Component {
    renderOrder = key => {
        const item = this.props.items[key];
        const count = this.props.order[key];
        return <li>
            {count} x {item.name}

            {formatPrice(count * item.price)}
        </li>
    }
    render () {
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
                    <ul>
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