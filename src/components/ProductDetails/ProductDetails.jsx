import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

import RelatedProducts from './RelatedProducts/RelatedProducts';

import PlusIcon from './../../assets/plus.png';
import MinusIcon from './../../assets/minus.png';
import SuccessIcon from './../../assets/success-alt.png';

const ProductDetails = ({ match, onAddProductToCart }) => {
	const productId = match.params.id;
	const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [alertClass, setAlertClass] = useState('');

	const fetchProductById = async (productId) => {
		const productInfo = await commerce.products.retrieve(productId);
		setProduct(productInfo);
        setIsLoading(false);
	};

	useEffect(() => {
        setIsLoading(true);
		fetchProductById(productId);
	}, [productId]);

    const handleCartButtonClick = () => {
        // Add the product to the cart and show a success alert.
        onAddProductToCart(product.id, quantity);
        setAlertClass('show');
        setTimeout(() => {
			setAlertClass('');
		}, 3000);
    }

	return (
		<div className="product-details container">            
            <div className="back">
            <Link to={'/'} style={{ textDecoration: 'none' }} >
                <span className="btn-home">Home</span>
            </Link>/
            {!isLoading && product && <span className="product-header">{product.name}</span>}
            </div>
			{isLoading? <span className="loading">Loading...</span> : product && (
                <>
                    <div className="flex-container">
                        <div className="name flex-item">{product.name}</div>
                        
                        <div className="image-container flex-item">                        
                            <img src={product.media.source} className="main-img" alt="main" />
                        </div>
                        <div className="info-container flex-item">
                            <div className="product-info">
                                <span className="price">€{product.price.formatted}</span>
                                <span className="description" dangerouslySetInnerHTML={ {__html: product.description} }></span>                            
                            </div>
                            <div className="details-flex-container">
                                <div className="product-quantity-container">
                                    <button
                                        className="quantity-icon" onClick={() => setQuantity(quantity - 1)} >
                                        <img src={MinusIcon} className="quantity-image" alt="Minus" />
                                    </button>
                                    <span className="quantity-amount">{quantity}</span>
                                    <button
                                        className="quantity-icon" onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        <img src={PlusIcon} className="quantity-image" alt="Plus" />
                                    </button>
                                </div>
                                <button className="btn-cart" onClick={handleCartButtonClick}>Add to Cart</button>
                                <div id="success-alert" className={alertClass}>
                                    <img className="alert-image" src={SuccessIcon} alt="Success" />
                                    <span>Added to cart!</span>
                                </div>
                            </div>
                            
                        </div>					
                    </div>
                    <>
                        {product.related_products.length > 0 ? (
                            <RelatedProducts
                                relatedProducts={product.related_products}
                            />
                        ) : null}
                    </>
                </>
			)}
		</div>
	);
};

export default ProductDetails;
