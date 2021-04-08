import React from 'react';

const ProductDetailsSkeleton = () => {
	return (
		<div className="details-skeleton-container">
            <div className="skeleton-details-header animated-gradient"></div>
			<div className="skeleton-image-container sub-container">
				<div className="details-skeleton-image animated-gradient"></div>
			</div>
			<div className="skeleton-info-container sub-container">
				<div className="details-skeleton-price details-skeleton-line animated-gradient"></div>
				<div className="details-skeleton-line animated-gradient"></div>
				<div className="details-skeleton-line animated-gradient"></div>
				<div className="details-skeleton-line animated-gradient"></div>
				<div className="details-skeleton-line animated-gradient"></div>
				<div className="details-skeleton-line last-line animated-gradient"></div>
				<div className="details-skeleton-button animated-gradient"></div>
			</div>
		</div>
	);
};

export default ProductDetailsSkeleton;
