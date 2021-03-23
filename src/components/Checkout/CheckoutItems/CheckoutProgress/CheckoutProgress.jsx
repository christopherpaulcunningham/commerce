import React from 'react';

const CheckoutProgress = ({ checkoutStage }) => {
    return (
        <div className="checkout-progress">
            <div className={"progress-item" + (checkoutStage === 0 ? " active" : " inactive")}>Address</div>
            <div className={"progress-item" + (checkoutStage === 1 ? " active" : " inactive")}>Payment</div>
            <div className={"progress-item" + (checkoutStage === 2 ? " active" : " inactive")}>Review</div>
        </div>
    )
}

export default CheckoutProgress; 
