import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

import { ScrollToTop, Navbar, Footer, Homepage, ProductDetails, Cart, Checkout, Shop } from './components';

import './main.scss';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});

	// Fetch a list of products from commerce js.
	const fetchProducts = async () => {
		const { data } = await commerce.products.list({ limit: 200 });
		setProducts(data.filter((product) => product.active === true));
	};

	// Fetch the cart.
	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
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

	const handleClearShoppingCart = async () => {
		const emptyCart = await commerce.cart.refresh();
		setCart(emptyCart);
	};

	const handleCheckout = async (checkoutTokenId, orderDetails) => {
		try {
			const newOrder = await commerce.checkout.capture(
				checkoutTokenId,
				orderDetails
			);
			setOrder(newOrder);
			handleClearShoppingCart();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	const handleResetOrder = () => {
		setOrder({});
	}

	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<ScrollToTop />
				<Switch>
					<Route exact path="/">
						<Homepage products={products} />
					</Route>				
					<Route
						path="/products/:id"
						render={(props) => (
							<ProductDetails
								{...props}
								onAddProductToCart={handleAddProductToCart}
							/>
						)}
					/>		
					<Route
						path="/shop/:category"
						render={(props) => (
							<Shop {...props} products={products} />
						)}
					/>
					<Route exact path="/cart">
						<Cart
							cart={cart}
							onAddProductToCart={handleAddProductToCart}
							onRemoveProductFromCart={
								handleRemoveProductFromCart
							}
							onUpdateCartQuantity={handleUpdateCartQuantity}
						/>
					</Route>
					<Route exact path="/checkout">
						<Checkout
							cart={cart}
							order={order}
							resetOrder={handleResetOrder}
							onClearShoppingCart={handleClearShoppingCart}
							onCheckout={handleCheckout}
						/>
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
