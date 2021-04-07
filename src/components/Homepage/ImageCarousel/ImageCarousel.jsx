import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import FujiImage from '../../../assets/fuji-feather-1.jpeg';
import CinelliImage from '../../../assets/cinelli-1.png';

const ImageCarousel = () => {
	var settings = {
		arrows: false,
		dots: true,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
		],
	};

	return (
		<div className="image-carousel-container">
			<Slider {...settings}>
				<div className="image-carousel-item">
					<Link to="/products/prod_31q0o3QMglDdjR">				
						<img className="carousel-image" src={CinelliImage} />
						<div className="carousel-image-text cinelli-text">
							Buy Now!
						</div>
					</Link>	
				</div>
				<div className="image-carousel-item">
					<Link to="/products/prod_ZM8X5nZ4Q5pv4q">
						<img className="carousel-image" src={FujiImage} />
						<div className="carousel-image-text fuji-text">
							Buy Now!
						</div>
					</Link>
				</div>
			</Slider>
		</div>
	);
};

export default ImageCarousel;
