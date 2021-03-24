import React from 'react';

const CheckoutProgress = ({ checkoutStage, checkoutSteps }) => {
    return (
        <div className="checkout-progress">
            {checkoutSteps.map((step, index) => {
                return <div key={index} className={"progress-item" + (checkoutStage === index ? " active" : " inactive")}>{step}</div>
            })}
        </div>
    )
}

export default CheckoutProgress; 
