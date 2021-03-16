import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

import { Navbar, Homepage } from './components';

import './main.scss';

const App = () => {
	const [products, setProducts] = useState([]);

	// Fetch a list of products from commerce js.
	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};	

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<Router>
			<div>
				<Navbar totalItems={2} />
				<Switch>
					<Route exact path="/">
						<Homepage products={products} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
