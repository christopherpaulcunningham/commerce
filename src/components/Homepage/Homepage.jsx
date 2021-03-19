import React from 'react';

import Product from './Product/Product';

const Homepage = ({ products }) => {
	return (
		<div className="homepage">
			<span className="homepage-title">Featured Products</span>
			{products.map((product, index) => 
				<Product product={product} key={index} />
			)}
		</div>
	);
};

export default Homepage;
