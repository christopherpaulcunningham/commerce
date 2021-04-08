import React from 'react';

const ProductSkeleton = () => {
	return (
		<div className="product-skeleton">
			<div className="skeleton-image animated-gradient"></div>
			<div className="skeleton-line long animated-gradient"></div>
			<div className="skeleton-line short animated-gradient"></div>
		</div>
	);
};

export default ProductSkeleton;
