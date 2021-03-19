import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

import PlusIcon from './../../assets/plus.png';
import MinusIcon from './../../assets/minus.png';

const ProductDetails = ({ match, onAddProductToCart }) => {
	const productId = match.params.id;
	const history = useHistory();
	const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);

	const fetchProductById = async (productId) => {
		const productInfo = await commerce.products.retrieve(productId);
		setProduct(productInfo);
	};

	useEffect(() => {
		fetchProductById(productId);
	}, [productId]);

	return (
		<div className="product-details">
            <div className="back">
                <button className="btn-home" onClick={(() => { history.go(-1)})} >Home</button>/
                {product && <span className="product-header">{product.name}</span>}
            </div>
			{product && (
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
                            <button className="btn-cart" onClick={() => onAddProductToCart(product.id, quantity) }>Add to Cart</button>                            
                        </div>
                        
                    </div>					
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
