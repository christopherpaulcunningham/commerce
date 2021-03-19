import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

import { Navbar, Homepage, ProductDetails, Cart } from './components';

import './main.scss';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	// Fetch a list of products from commerce js.
	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	// Fetch the cart.
	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
		console.log(cart);
	};

	const handleAddProductToCart = async (productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};

	const handleRemoveProductFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};

	const handleUpdateCartQuantity = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, { quantity });
		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Switch>
					<Route exact path="/">
						<Homepage products={products} />
					</Route>
					<Route
						path="/products/:id"
						render={(props) => (
							<ProductDetails {...props} onAddProductToCart={handleAddProductToCart}
							/>
						)}
					/>
					<Route exact path="/cart">
						<Cart
							cart={cart}
							onAddProductToCart={handleAddProductToCart}
							onRemoveProductFromCart={handleRemoveProductFromCart}
							onUpdateCartQuantity={handleUpdateCartQuantity}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
