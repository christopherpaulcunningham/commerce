import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

const ProductDetails = ({ match }) => {
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
                        <button className="btn-cart">Add to Cart</button>
                    </div>					
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
