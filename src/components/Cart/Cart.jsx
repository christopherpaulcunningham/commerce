import React from 'react';
import { Link } from 'react-router-dom';

import EmptyCart from './EmptyCart/EmptyCart';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, onRemoveProductFromCart, onUpdateCartQuantity }) => {
	if (!cart.line_items)
		return (
			<div className="cart">
				<span className="title">
					Your cart <span className="total-items">(0)</span>
				</span>
				<span className="loading">Loading...</span>
			</div>
		);

	return (
		<div className="cart">
			<span className="title">
				Your cart{' '}
				<span className="total-items">({cart.total_items})</span>
			</span>
			{!cart.line_items.length ? (
				<EmptyCart />
			) : (
				<div>
					<div className="items-container">
						{cart.line_items.map((item, index) => (
							<CartItem
								onRemoveProductFromCart={
									onRemoveProductFromCart
								}
								onUpdateCartQuantity={onUpdateCartQuantity}
								item={item}
								key={index}
							/>
						))}
					</div>
					<div className="subtotal-container">
						<span className="subtotal-title">Subtotal</span>
						<span className="subtotal-amount">
							{cart.subtotal.formatted_with_symbol}
						</span>
						<span className="shipping-notice">
							Shipping costs will be calculated at checkout.
						</span>
						<div className="cart-buttons">
							<Link to="/" style={{ width: '100%' }}>
								<button className="secondary-btn cart-button">
									Cancel
								</button>
							</Link>
							<Link to="/checkout" style={{ width: '100%' }}>
								<button className="primary-btn cart-button">
									Checkout
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
