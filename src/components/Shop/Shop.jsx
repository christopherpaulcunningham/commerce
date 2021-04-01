import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Product from '../Product/Product';

const Shop = ({ match, products }) => {
	const history = useHistory();
	const [productList, setProductList] = useState({});
	const [productCategory, setProductCategory] = useState();

	useEffect(() => {
		validateParams();
	}, []);

	useEffect(() => {
		validateParams();
	}, [match]);

	const validateParams = () => {
		let currentCategory = match.params.category;
		if (currentCategory === 'bicycles' || currentCategory === 'accessories') {
			setProductCategory(`${currentCategory[0].toUpperCase()}${currentCategory.slice(1)}`);

            // Display the appropriate products - bikes, accessories, etc.
            if (products.length > 1) {
                let filteredList = products.filter((product) =>
                    product.categories.some(
                        (category) =>
                            category.name.toLowerCase() === currentCategory
                    )
                );
                setProductList(filteredList);
            }
		} else {
			// Redirect to the home page.
			history.push('/');
		}
	};

	return (
		<div className="shop-container container">
			<div className="back">
				<Link to={'/'} style={{ textDecoration: 'none' }}>
					<span className="btn-home">Home</span>
				</Link>
				/<span className="product-header">{productCategory}</span>
				{/* {!isLoading && product && <span className="product-header">{product.name}</span>} */}
			</div>
			<div className="shop-product-list">
				{productList.length &&
					productList.map((product) => (
						<Product product={product} key={product.id} />
					))}
			</div>
			{/* <div className="shop-flex-container">
				<div className="shop-filter-options">
					Filter by price
				</div>
				<div className="shop-product-list">
					{productList.length &&
						productList.map((product) => (
							<Product product={product} key={product.id} />
						))}
				</div>
			</div> */}
		</div>
	);
};

export default Shop;
