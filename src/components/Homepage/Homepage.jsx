import React from 'react';

import Product from '../Product/Product';

import HomeImage1 from '../../assets/home-image-1.jpeg';

const Homepage = ({ products }) => {
	console.log(products);
	return (
		<div className="homepage-container container">
			{/* <img src={HomeImage1} alt="Fuji" /> */}
			<span className="homepage-title">Featured Products</span>
			{products.map((product, index) => 
				<Product product={product} key={product.id} />
			)}
		</div>
	);
};

export default Homepage;
