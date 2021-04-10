import React from 'react';

import SuccessIcon from '../../../../assets/success.png';

const OrderConfirmation = ({order}) => {
    console.log(order);
    
    return (
        <div className="order-confirmation-container">
            <img src={SuccessIcon} alt="Success" className="success-icon" />
            {order.customer && <span className="thanks-text">Thank you for your order, {order.customer.firstname}!</span>}
            {order.customer && <span className="order-number-text">Your order number is {order.customer_reference}.</span>}
        </div>
    )
}

export default OrderConfirmation;
