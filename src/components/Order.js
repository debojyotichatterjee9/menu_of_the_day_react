import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers"
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {

    static propTypes = {
        items: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };


    renderOrder = key => {
        const item = this.props.items[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>❌</button>
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: {enter: 500, exit: 500},
        };

        if (!item || item.status === 'unavailable') {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>Sorry, {item ? item.name : 'item'} is no longer available.{removeButton}</li>
                </CSSTransition>
            )
        };

        return (
            <CSSTransition {...transitionOptions}>

                <li key={key}>
                    <span>
                        
                        
                            <TransitionGroup component="span" className="count">
                                <CSSTransition 
                                classNames="count"
                                key={count}
                                timeout={{ enter: 250, exit: 250 }}>
                                    <span>{count}</span>
                                </CSSTransition>
                            </TransitionGroup> ✖ {item.name} 👉 
                        <span className="price">{formatPrice(count * item.price)}{removeButton}</span>
                    </span>
                </li>
            </CSSTransition>
        );
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
                    <TransitionGroup component="ul" className="order">
                        {orderIds.map(this.renderOrder)}
                    </TransitionGroup>
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