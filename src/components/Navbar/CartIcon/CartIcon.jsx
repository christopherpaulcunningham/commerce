import React from 'react';
import { Link } from 'react-router-dom';

import cartIcon from '../../../assets/shopping-cart-black.png';

const CartIcon = ({ totalItems }) => {
	return (
		<Link to="/cart">
			<div className="cart-icon">
				<img src={cartIcon} className="cart-image" alt="Cart icon" />
				{totalItems > 0 && <div className="badge">{totalItems}</div>}
			</div>
		</Link>
	);
};

export default CartIcon;
