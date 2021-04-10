import React from 'react';

const CartItemSkeleton = () => {
	return (
		<div className="cart-skeleton-container">
			<div className="cart-skeleton-item">
				<div className="skeleton-cart-item-image animated-gradient"></div>
				<div className="skeleton-cart-sub-container">
					<div className="skeleton-cart-line long animated-gradient"></div>
					<div className="skeleton-cart-line short animated-gradient"></div>
					<div className="skeleton-cart-line short animated-gradient"></div>
					<div className="skeleton-cart-line short animated-gradient"></div>
				</div>
			</div>
			<div className="cart-skeleton-item">
				<div className="skeleton-cart-item-image animated-gradient"></div>
				<div className="skeleton-cart-sub-container">
					<div className="skeleton-cart-line long animated-gradient"></div>
					<div className="skeleton-cart-line short animated-gradient"></div>
					<div className="skeleton-cart-line short animated-gradient"></div>
					<div className="skeleton-cart-line short animated-gradient"></div>
				</div>
			</div>
			<div className="align-right">
				<div className="skeleton-cart-line medium animated-gradient"></div>
				<div className="skeleton-cart-button-container">
					<div className="animated-gradient"></div>
					<div className="animated-gradient"></div>
				</div>
			</div>
		</div>
	);
};

export default CartItemSkeleton;
