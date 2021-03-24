import React, { useEffect, useState } from 'react';

import { commerce } from '../../lib/commerce';

import {
	CheckoutProgress,
	AddressForm,
	PaymentForm,
	OrderReview,
} from './CheckoutItems';

const Checkout = ({ cart }) => {
	const checkoutSteps = ["Address", "Payment", "Review"];
	const [checkoutStage, setCheckoutStage] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [deliveryDetails, setDeliveryDetails] = useState({});

	const handleBackClick = () => {
		setCheckoutStage((prevActiveStep) => prevActiveStep - 1);
	};

	const handleNextClick = (data) => {
		setCheckoutStage((prevActiveStep) => prevActiveStep + 1);
		setDeliveryDetails(data);
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
			return <AddressForm onNextClick={handleNextClick} setDeliveryDetails={setDeliveryDetails} checkoutToken={checkoutToken} />;
		} else if (checkoutStage === 1) {
			return <PaymentForm onBackClick={handleBackClick} />;
		} else {
			return <OrderReview onBackClick={handleBackClick} />;
		}
	};

	return (
		<div className="checkout-container">
			<CheckoutProgress checkoutStage={checkoutStage} checkoutSteps={checkoutSteps} />
			{checkoutStage === checkoutSteps.length ? "Order Confirmation Page" : checkoutToken && <ActiveForm />}			
		</div>
	);
};

export default Checkout;
