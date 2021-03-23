import React, { useState } from 'react';

import { CheckoutProgress, AddressForm, PaymentForm, OrderReview } from './CheckoutItems';

const Checkout = () => {
	const [checkoutStage, setCheckoutStage] = useState(0);

	const ActiveForm = () => {
		switch (checkoutStage) {
			case 0:
				return <AddressForm />;
			case 1:
				return <PaymentForm />;
			case 2:
				return <OrderReview />;
		}
	};

	return (
		<div className="checkout-container">
			<CheckoutProgress checkoutStage={checkoutStage} />
			<ActiveForm />
		</div>
	);
};

export default Checkout;
