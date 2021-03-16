import React from 'react';

import Product from './Product/Product';

const Homepage = ({ products }) => {
	return (
		<div className="homepage">
			<h2 className="title">Featured Products</h2>
			{products.map((product, index) => {
				return <Product product={product} key={index} />;
			})}
		</div>
	);
};

export default Homepage;
