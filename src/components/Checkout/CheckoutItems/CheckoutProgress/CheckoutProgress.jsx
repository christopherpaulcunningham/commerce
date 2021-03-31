import React from 'react';

const CheckoutProgress = ({ checkoutStage, checkoutSteps }) => {
	return (
		<div className="checkout-progress">
			{checkoutSteps.map((step, index) => {
				return (
					<div
						key={index}
						className={
							'progress-item' +
							(checkoutStage === index ? ' active' : ' inactive')
						}
					>
						<img src={checkoutStage === index ? step.activeIcon : step.disabledIcon} className="checkout-progress-icon" />
					</div>
				);
			})}
		</div>
	);
};

export default CheckoutProgress;
