import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { commerce } from '../../lib/commerce';

import {
	CheckoutProgress,
	AddressForm,
	PaymentForm,
	OrderConfirmation,
	CheckoutSkeleton,
} from './CheckoutItems';

import PinIconActive from '../../assets/pin.png';
import PinIconDisabled from '../../assets/pin-faded.png';
import CardIconActive from '../../assets/credit-card.png';
import CardIconDisabled from '../../assets/credit-card-faded.png';
import TickIconActive from '../../assets/tick.png';
import TickIconDisabled from '../../assets/tick-faded.png';

const Checkout = ({ cart, order, resetOrder, onCheckout }) => {
	const history = useHistory();
	const checkoutSteps = [
		{
			name: 'Address',
			activeIcon: PinIconActive,
			disabledIcon: PinIconDisabled,
		},
		{
			name: 'Payment',
			activeIcon: CardIconActive,
			disabledIcon: CardIconDisabled,
		},
		{
			name: 'Confirmation',
			activeIcon: TickIconActive,
			disabledIcon: TickIconDisabled,
		},
	];

	const [checkoutStage, setCheckoutStage] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [deliveryData, setDeliveryData] = useState({});

	const handleBackClick = () => {
		setCheckoutStage((prevActiveStep) => prevActiveStep - 1);
		window.scrollTo(0, 0);
	};

	const handleNextClick = (data) => {
		setCheckoutStage((prevActiveStep) => prevActiveStep + 1);
		window.scrollTo(0, 0);
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

	useEffect(() => {
		resetOrder();
		if (!cart.line_items) {
			history.push('/cart');
		}
	}, []);

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
			return <OrderConfirmation order={order} />;
		}
	};

	return (
		<div className="checkout-container container">
			<CheckoutProgress
				checkoutStage={checkoutStage}
				checkoutSteps={checkoutSteps}
			/>
			{checkoutStage === checkoutSteps.length ? (
				<OrderConfirmation order={order} />
			) : checkoutToken ? (
				<ActiveForm />
			) : (
				<CheckoutSkeleton />
			)}
		</div>
	);
};

export default Checkout;
