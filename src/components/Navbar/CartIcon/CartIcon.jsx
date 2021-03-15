import React from 'react';

import cartIcon from '../../../assets/shopping-cart-black.png';

const CartIcon = ({ totalItems }) => {
	return (
		<div className="cart-icon">
			<img src={cartIcon} className="cart-image" />
			{totalItems > 0 && <div className="badge">{totalItems}</div>}
		</div>
	);
};

export default CartIcon;
