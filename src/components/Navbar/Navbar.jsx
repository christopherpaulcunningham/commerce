import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';
import CartIcon from './CartIcon/CartIcon';

const Navbar = ({ totalItems }) => {
	const location = useLocation();

	return (
		<div className="navbar">
			<Link to="/">
				<img src={logo} className="logo" alt="logo" />
			</Link>
			{/* Hide the cart icon when viewing the cart */}
			{location.pathname !== '/cart' && (
				<CartIcon totalItems={totalItems} />
			)}
		</div>
	);
};

export default Navbar;
