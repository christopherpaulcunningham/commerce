import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { commerce } from '../../../../lib/commerce';

import AddressFormInput from './AddressFormInput/AddressFormInput';

const AddressForm = ({ checkoutToken, onNextClick }) => {
	const { register, handleSubmit, errors } = useForm();

	// For each of the shipping fields two state items are required - one
	// for the available options, another for the option itself.
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState('');
	const [shippingAvailableOptions, setShippingAvailableOptions] = useState(
		[]
	);
	const [shippingOption, setShippingOption] = useState('');

	// Options for dropdown menus.
	const countries = Object.entries(shippingCountries).map(([code, name]) => ({
		id: code,
		label: name,
	}));

	const subdivisions = Object.entries(shippingSubdivisions).map(
		([code, name]) => ({
			id: code,
			label: name,
		})
	);

	const fetchShippingCountries = async (checkoutTokenId) => {
		const {
			countries,
		} = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubdivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);
		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (checkoutTokenId, country) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country, region: null }
		);
		setShippingAvailableOptions(options);
		setShippingOption(options[0].id);
	};

	useEffect(() => {
		if (checkoutToken) fetchShippingCountries(checkoutToken.id);
	}, [checkoutToken]);

	useEffect(() => {
		if (shippingCountry) {
			fetchSubdivisions(shippingCountry);
			fetchShippingOptions(checkoutToken.id, shippingCountry);
		}
	}, [shippingCountry, checkoutToken]);

	return (
		<div className="address-form">
			<span className="address-title">Delivery Address</span>
			<form
				onSubmit={handleSubmit((data) =>
					onNextClick({
						...data,
						shippingCountry,
						shippingSubdivision,
						shippingOption,
						shippingCost:
							shippingAvailableOptions[0].price
								.formatted_with_symbol,
					})
				)}
				noValidate={true}
				className="form"
			>
				<AddressFormInput
					type="email"
					id="email"
					label="Email address"
					name="email"
					register={register({
						required: 'Email address is required.',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: 'Enter a valid e-mail address',
						},
					})}
					error={errors.email}
					className="address-form-item"
				/>
				<AddressFormInput
					type="tel"
					id="phone"
					label="Phone number"
					name="phone"
					register={register({
						required: 'Phone number is required.',
					})}
					error={errors.phone}
					className="address-form-item"
				/>
				<AddressFormInput
					type="text"
					id="firstName"
					label="First name"
					name="firstName"
					register={register({ required: 'First name is required.' })}
					error={errors.firstName}
					className="address-form-item"
				/>
				<AddressFormInput
					type="text"
					id="lastName"
					label="Last name"
					name="lastName"
					register={register({ required: 'Last name is required.' })}
					error={errors.lastName}
					className="address-form-item"
				/>
				<AddressFormInput
					type="text"
					id="address1"
					label="Address"
					name="address1"
					register={register({ required: 'Address is required.' })}
					error={errors.address1}
					className="address-form-item"
				/>
				<AddressFormInput
					type="text"
					id="address2"
					label="Address 2"
					name="address2"
					register={register()}
					className="address-form-item"
				/>
				<AddressFormInput
					type="text"
					id="city"
					label="City"
					name="city"
					register={register({ required: 'City is required.' })}
					error={errors.city}
					className="address-form-item"
				/>
				<AddressFormInput
					type="text"
					id="postCode"
					label="Post code"
					name="postCode"
					register={register({ required: 'Post code is required.' })}
					error={errors.postCode}
					className="address-form-item"
				/>

				<div className="dropdown-container">
					<label className="form-item-label">Country</label>
					<select
						className="address-dropdown"
						onChange={(evt) => setShippingCountry(evt.target.value)}
					>
						{countries.map((country) => (
							<option key={country.id} value={country.id}>
								{country.label}
							</option>
						))}
					</select>
				</div>
				<div className="dropdown-container">
					<label className="form-item-label">State/Province</label>
					<select
						className="address-dropdown"
						onChange={(evt) =>
							setShippingSubdivision(evt.target.value)
						}
					>
						{subdivisions.map((subdivision) => (
							<option key={subdivision.id} value={subdivision.id}>
								{subdivision.label}
							</option>
						))}
					</select>
				</div>
				<div className="dropdown-container wide-dropdown">
					<label className="form-item-label">Shipping options</label>
					<select
						className="address-dropdown"
						onChange={(evt) => setShippingOption(evt.target.value)}
					>
						{shippingAvailableOptions.map((option) => (
							<option key={option.id} value={option.id}>
								{option.description} -{' '}
								{option.price.formatted_with_symbol}
							</option>
						))}
					</select>
				</div>
				<div style={{ marginTop: '6.5rem', width: '50%' }}></div>
				<button type="submit" className="btn-next primary-btn">
					Next
				</button>
			</form>
		</div>
	);
};

export default AddressForm;
