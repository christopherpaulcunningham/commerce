import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import EmptyCart from './EmptyCart/EmptyCart';
import CartItem from './CartItem/CartItem';
import CartItemSkeleton from './CartItemSkeleton/CartItemSkeleton';

import RemovedIcon from '../../assets/removed.png';

const Cart = ({ cart, onRemoveProductFromCart, onUpdateCartQuantity }) => {
	const [alertClass, setAlertClass] = useState('');

	return (
		<div className="cart container">
			<span className="title">
				Your cart{' '}
				<span className="total-items">({cart.total_items})</span>
			</span>
			{!cart.line_items ? (
				<CartItemSkeleton />
			) : !cart.line_items.length ? (
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
								setAlertClass={setAlertClass}
								item={item}
								key={index}
							/>
						))}
					</div>
					<div id="removed-alert" className={alertClass}>
						<img
							className="alert-image"
							src={RemovedIcon}
							alt="Removed"
						/>
						<span>Removed from cart.</span>
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
