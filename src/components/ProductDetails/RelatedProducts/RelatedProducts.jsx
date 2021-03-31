import React from 'react';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedProducts = ({ relatedProducts }) => {
	console.log(relatedProducts);
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: relatedProducts.length > 1 ? 2 : 1,
		slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
        ]
	};

	return (
		<div className="related-products-container">
            <span className="title centered-title">Related Products</span>
			<Slider {...settings}>
				{relatedProducts.map((product) => (                    
                    <div className="related-product-item-container" key={product.id}>
                        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: '#000000' }} >
                            <div className="related-product-item">
                                <img
                                    className="related-product-item-image"
                                    src={product.media.source}
                                    alt="Product"
                                />
                                <span className="related-product-item-name">{product.name}</span>
                                <span className="related-product-item-price">{product.price.formatted_with_symbol}</span>
                            </div>
                        </Link>
                    </div>
				))}
			</Slider>
		</div>
	);
};

export default RelatedProducts;
