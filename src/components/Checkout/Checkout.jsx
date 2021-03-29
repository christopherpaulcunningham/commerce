import React, { useEffect, useState } from 'react';

import { commerce } from '../../lib/commerce';

import {
	CheckoutProgress,
	AddressForm,
	PaymentForm,
	OrderConfirmation
} from './CheckoutItems';

const Checkout = ({ cart, order, handleClearShoppingCart, onCheckout }) => {
	const checkoutSteps = ['Address', 'Payment', 'Confirm'];
	const [checkoutStage, setCheckoutStage] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [deliveryData, setDeliveryData] = useState({});

	const handleBackClick = () => {
		setCheckoutStage((prevActiveStep) => prevActiveStep - 1);
	};

	const handleNextClick = (data) => {
		setCheckoutStage((prevActiveStep) => prevActiveStep + 1);
		setDeliveryData(data);
	};

	useEffect(() => {
		// When the user starts the checkout process, generate a checkout token.
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: 'cart',
				});
				setCheckoutToken(token);
			} catch (error) {
				console.log(error);
			}
		};
		generateToken();
	}, [cart]);

	const ActiveForm = () => {
		if (checkoutStage === 0) {
			return (
				<AddressForm
					onNextClick={handleNextClick}
					checkoutToken={checkoutToken}
				/>
			);
		} else if (checkoutStage === 1) {
			return (
				<PaymentForm
					onNextClick={handleNextClick}
					onBackClick={handleBackClick}
					checkoutToken={checkoutToken}
					deliveryData={deliveryData}
					onCheckout={onCheckout}
				/>
			);
		} else {
			return <OrderConfirmation order={order}/>;
		}
	};

	return (
		<div className="checkout-container">
			<CheckoutProgress
				checkoutStage={checkoutStage}
				checkoutSteps={checkoutSteps}
			/>
			{checkoutStage === checkoutSteps.length
				? 'Order Confirmation Page'
				: checkoutToken && <ActiveForm />}
		</div>
	);
};

export default Checkout;
