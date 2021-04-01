import React, { useEffect, useState} from 'react';

import Product from '../Product/Product';

const Homepage = ({ products }) => {

	const [recentlyAdded, setRecentlyAdded] = useState({});

	useEffect(() => {
		if(products.length){
			let sortedProducts = products.sort((a,b) => (a.created < b.created) ? 1: -1);
			setRecentlyAdded(sortedProducts.slice(0,3));
		}
	}, [products])
	
	return (
		<div className="homepage-container container">
			{products ? <>
				<span className="homepage-title">Featured Products</span>
				{products.map((product, index) => 
					<Product product={product} key={product.id} />
				)}

				<span className="homepage-title">Newest Products</span>
				{recentlyAdded.length && recentlyAdded.map((product) => 
					<Product product={product} key={product.id} />
				)}
			</> : "Loading..." }
			
		</div>
	);
};

export default Homepage;
