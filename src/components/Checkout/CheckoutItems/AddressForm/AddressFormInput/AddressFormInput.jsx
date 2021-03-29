import React from 'react';

const AddressFormInput = ({ register, error, label, id, ...inputProps }) => {
	return (
		<div className="address-form-input">
			<label htmlFor={id} className="form-item-label">
				{label}
			</label>
			<input
				ref={register}
				id={id}
				{...inputProps}
				className="form-item-input"
			/>
			<div className="error-message-container">
				{error && (
					<span className="error-message">{error.message}</span>
				)}
			</div>
		</div>
	);
};

export default AddressFormInput;
