import React from 'react';

import logo from '../../assets/logo.png';
import CartIcon from './CartIcon/CartIcon';

const Navbar = ({ totalItems }) => {
	return (
		<div className="navbar">
			<img src={logo} className="logo" alt="logo" />
			<CartIcon totalItems={totalItems} />
		</div>
	);
};

export default Navbar;
