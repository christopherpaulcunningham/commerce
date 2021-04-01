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
			<div className="navbar-product-options">
			{location.pathname !== '/cart' && location.pathname !== '/checkout' && (
				<>
					<Link to="/shop/bicycles" style={{ textDecoration: 'none', color: '#000000' }}>
						<span>Bicycles</span>
					</Link>
					<Link to="/shop/accessories" style={{ textDecoration: 'none', color: '#000000' }}>
						<span>Accessories</span>
					</Link>
					<CartIcon totalItems={totalItems} />
				</>
				)}
			</div>			
		</div>
	);
};

export default Navbar;
