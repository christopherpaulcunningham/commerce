import React from 'react';

const OrderReview = ({ checkoutToken, shippingOption }) => {

    const shippingFee = checkoutToken && shippingOption ? checkoutToken.live.shipping.available_options.find(x => x.id === shippingOption).price.raw : 0;
    const orderTotal = checkoutToken && shippingOption ? (shippingFee + checkoutToken.live.total.raw) : 0;

    if(!checkoutToken || !shippingOption) return null;
	return (
		<div className="order-review">
            <span className="title">Order Summary</span>
			{checkoutToken.live.line_items && checkoutToken.live.line_items.map((item) => 
                <div className="review-item" key={item.id}>
                    <img src={item.media.source} alt="Product" className="review-item-image"/>
                    <div className="review-item-group">
                        <span className="review-item-name">{item.name}</span>
                        <span className="review-item-qty">{item.quantity} x {item.price.formatted_with_symbol}</span>
                    </div>
                    <span className="review-item-price">{item.line_total.formatted_with_symbol}</span>
                </div>
            )}
            <div className="review-total-container">
                <div className="order-subtotal">
                    <span className="review-total-header">Subtotal</span><span className="review-total-price">
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </span>
                </div>
                <div className="order-subtotal">
                    <span className="review-total-header">Shipping fee</span><span className="review-total-price">€{shippingFee}</span>
                </div>
                <span className="order-total">€{orderTotal}</span>
            </div>
		</div>
	);
};

export default OrderReview;
