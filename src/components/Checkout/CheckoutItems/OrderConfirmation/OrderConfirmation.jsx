import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SuccessIcon from '../../../../assets/success.png';

const OrderConfirmation = ({ order }) => {
	const [isProcessing, setIsProcessing] = useState(true);

	useEffect(() => {
		if (order.customer) setIsProcessing(false);
	}, [order]);

	return (
		<div className="order-confirmation-container">
			{isProcessing ? (
				<>
					<div className="swipe-animation">
						<div className="credit-card">
							<div className="credit-card-stripe"></div>
						</div>
						<div className="swiper-top"></div>
						<div className="swiper-bottom">
							<div className="light-indicator"></div>
						</div>
					</div>
					<span className="processing">Processing Payment</span>
				</>
			) : (
				<>
					<img
						src={SuccessIcon}
						alt="Success"
						className="success-icon"
					/>
					{order.customer && (
						<span className="thanks-text">Thank you for your order, {order.customer.firstname}!</span>
					)}
					{order.customer && (
						<span className="order-number-text">Your order number is {order.customer_reference}.</span>
					)}
					<Link to="/">
						<button className="primary-btn finish">Continue Shopping</button>
					</Link>
				</>
			)}
		</div>
	);
};

export default OrderConfirmation;
