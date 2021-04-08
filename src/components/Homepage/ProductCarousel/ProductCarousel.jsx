import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductSkeleton from '../../shared/ProductSkeleton/ProductSkeleton';

const ProductCarousel = ({ products, isLoading }) => {
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 855,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
		],
	};

	return (
		<div className="product-carousel-container">
			{!isLoading ? (
				<Slider {...settings}>
					{products &&
						products.map((product) => (
							<div
								className="product-carousel-item-container"
								key={product.id}
							>
								<Link
									to={`/products/${product.id}`}
									style={{
										textDecoration: 'none',
										color: '#000000',
									}}
								>
									<div className="product-carousel-item">
										<img
											className="product-carousel-item-image"
											src={product.media.source}
											alt="Product"
										/>
										<span className="product-carousel-item-name">
											{product.name}
										</span>
										<span className="product-carousel-item-price">
											{
												product.price
													.formatted_with_symbol
											}
										</span>
									</div>
								</Link>
							</div>
						))}
				</Slider>
			) : (
				<Slider {...settings}>
					{[...Array(5)].map((element, index) => (
						<ProductSkeleton key={index} />
					))}
				</Slider>
			)}
		</div>
	);
};

export default ProductCarousel;
