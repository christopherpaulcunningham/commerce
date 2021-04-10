import React from 'react';
import { Link } from 'react-router-dom';

import PlusIcon from './../../../assets/plus.png';
import MinusIcon from './../../../assets/minus.png';
import TrashIcon from './../../../assets/trashcan.png';

const CartItem = ({ item, onRemoveProductFromCart, onUpdateCartQuantity, setAlertClass }) => {

	const handleRemoveProductFromCart = (id) => {
		onRemoveProductFromCart(item.id);
		setAlertClass('show');
		setTimeout(() => {
			setAlertClass('');
		}, 3000);
	}

	return (
		<div className="cart-item">
			<img src={item.media.source} className="item-image" alt="Item" />

			<div className="item-details">
				<span className="item-name">
					<Link
						to={`/products/${item.product_id}`}
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						{item.name}
					</Link>
				</span>
				<div className="item-details-flexbox">
					<span className="item-price">€{item.price.formatted}</span>
					<div className="quantity">
						<button
							className="quantity-icon"
							onClick={() =>
								onUpdateCartQuantity(item.id, item.quantity - 1)
							}
						>
							<img src={MinusIcon} className="quantity-image" alt="Minus" />
						</button>
						<span className="quantity-amount">{item.quantity}</span>
						<button
							className="quantity-icon"
							onClick={() =>
								onUpdateCartQuantity(item.id, item.quantity + 1)
							}
						>
							<img src={PlusIcon} className="quantity-image" alt="Plus" />
						</button>
					</div>
					<button
						className="btn-remove"
						onClick={() => handleRemoveProductFromCart(item.id)}
					>
						Remove
					</button>
					<button
						className="btn-remove-alt"
						onClick={(evt) => handleRemoveProductFromCart(evt)}
					>
						<img src={TrashIcon} alt="Remove" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
