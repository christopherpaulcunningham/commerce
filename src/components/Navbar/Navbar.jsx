import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import CartIcon from './CartIcon/CartIcon';

const Navbar = ({ totalItems }) => {
	return (
		<div className="navbar">
			<Link to="/">
				<img src={logo} className="logo" alt="logo" />
			</Link>			
			<CartIcon totalItems={totalItems} />
		</div>
	);
};

export default Navbar;
