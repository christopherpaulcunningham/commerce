import React, { useEffect, useState} from 'react';

import Product from '../Product/Product';
import ImageCarousel from './ImageCarousel/ImageCarousel';
import ProductCarousel from './ProductCarousel/ProductCarousel';

const Homepage = ({ products }) => {

	const [recentlyAdded, setRecentlyAdded] = useState({});

	useEffect(() => {
		if(products.length){
			let sortedProducts = products.sort((a,b) => (a.created < b.created) ? 1: -1);
			setRecentlyAdded(sortedProducts.slice(0,8));
		}
	}, [products])
	
	return (
		<div className="homepage-container container">
			<div className="splash-container">
				<ImageCarousel />
			</div>
			{products ? <>
				<span className="homepage-title">Newest Products</span>
				{recentlyAdded.length && <ProductCarousel products={recentlyAdded} />}
			</> : "Loading..." }			
		</div>
	);
};

export default Homepage;
