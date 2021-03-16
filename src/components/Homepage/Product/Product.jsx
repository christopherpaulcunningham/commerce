import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
            <div className="product">
                <img src={product.media.source} className="product-img" alt="product" />
                <span className="product-name info">{product.name}</span>
                <span className="product-price info">€{product.price.formatted}</span>
            </div>
        </Link>
    )
}

export default Product;
