import React from 'react';

const CheckoutSkeleton = () => {
	return (
		<div className="checkout-skeleton-container">
			<div className="checkout-skeleton-header">
				<div className="animated-gradient"></div>
			</div>
			{[...Array(12)].map((el, index) => (
				<div className="checkout-skeleton-item" key={index}>
					<div className="checkout-skeleton-line short animated-gradient"></div>
					<div className="checkout-skeleton-line input animated-gradient"></div>
				</div>
			))}
		</div>
	);
};

export default CheckoutSkeleton;
