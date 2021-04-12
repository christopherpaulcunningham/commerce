import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
	CardElement,
	Elements,
	ElementsConsumer,
} from '@stripe/react-stripe-js';

import OrderReview from './OrderReview/OrderReview';

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ onNextClick, checkoutToken, deliveryData, onCheckout }) => {

	const handleSubmit = async (evt, elements, stripe) => {
		// Don't refresh on button click.
		evt.preventDefault();

		if (!elements || !stripe) return;

		// Create a payment method.
		const cardElement = elements.getElement(CardElement);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (!error) {
			// Create a variable to store all of the order information.
			const orderData = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: deliveryData.firstName,
					lastname: deliveryData.lastName,
					email: deliveryData.email,
				},
				shipping: {
					name: `${deliveryData.firstName} ${deliveryData.lastName}`,
					street: `${deliveryData.address1}, ${deliveryData.address2}`,
					town_city: deliveryData.city,
					county_state: deliveryData.shippingSubdivision,
					postal_zip_code: deliveryData.zip,
					country: deliveryData.shippingCountry,
				},
				fulfillment: { shipping_method: deliveryData.shippingOption },
				payment: {
					gateway: 'stripe',
					stripe: {
						payment_method_id: paymentMethod.id,
					},
				},
			};

            onCheckout(checkoutToken.id, orderData);
            onNextClick(orderData);
		} else {
			console.log(error);
		}
	};

	return (
		<div className="payment-form">
			<div className="order-review-container">
				<OrderReview checkoutToken={checkoutToken} shippingOption={deliveryData.shippingOption} />
			</div>
			<div className="payment-details">
				<span className="title">Payment Information</span>
				<Elements stripe={stripe}>
					<ElementsConsumer>
						{({ elements, stripe }) => (
							<form
								noValidate={true}
								onSubmit={(evt) => handleSubmit(evt, elements, stripe)}
							>
								<CardElement />
								<button className="primary-btn btn-pay">
									Pay Now
								</button>
							</form>
						)}
					</ElementsConsumer>
				</Elements>
			</div>
		</div>
	);
};

export default PaymentForm;
