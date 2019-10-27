import React from "react";
import { formatPrice } from "../helpers"

class Order extends React.Component {
    
    renderOrder = key => {
        const item = this.props.items[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>❌</button>

        if (!item || item.status === 'unavailable') {
            return <li key={key}>Sorry, {item ? item.name : 'item'} is no longer available.{removeButton}</li>
        }

        return (
            <li key={key}>{removeButton}
            <span>{count} ✖ {item.name} 👉 </span>    
                <span className="price">{formatPrice(count * item.price)}</span>
            </li> 
        )
    }

    /*NOTE: WE CAN CREATE A LIFE CYCLE HOOK FOR THE ORDER HERE RATHER THAN CREATING ON THE App.js FILE FOR THE ORDER UPDATE 
    AND STORING IN THE LOCAL STORAGE. HOWEVER FOR THE SAKE OF UNIFORMITY i HAVE CREATED THE HOOK IN App.js ALSO THE BELOW ONE IS 
    COMMENTED OUT AND CAN BE SWITCHED BACK IF THE ONE ON THE App.js IS COMMENTED.*/

    // componentWillUpdate(nextProps, nextState) {
    //     const cafeId = this.props.params.cafeId
    //     localStorage.setItem(`order-${cafeId}`, JSON.stringify(nextProps.order));
    //     // console.log({nextProps, nextState})
    //   }
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