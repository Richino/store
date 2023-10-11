"use client";
import { useState } from "react";
import { games } from "@/database";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import nProgress from "nprogress";

export default function Page() {
	const cartItems = useSelector((state: RootState) => state.nav);
	const [checkoutItems, setCheckoutItems] = React.useState<any>([]);
	const [cvv, setCvv] = useState("");
	const [expireDate, setExpireDate] = useState("");
	const [card, setCard] = useState("");
	const handleCvvChange = (e: any) => {
		const inputValue = e.target.value;
		if (inputValue.length > 3) return;

		// Use a regular expression to allow only numbers
		const numericInput = inputValue.replace(/[^0-9]/g, "");

		// Update the state with the numeric input
		setCvv(numericInput);
	};

	const handleExpireDateChange = (e: any) => {
		const expirationValue = e.target.value;
		if (expirationValue.length > 7) return;
		let numericInput = expirationValue.replace(/[^0-9]/g, "");

		//omly slice after it pass 2 digits
		if (numericInput.length >= 2) {
			numericInput = numericInput.slice(0, 2) + "/" + numericInput.slice(2);
		}

		setExpireDate(numericInput);
	};

	const handleCardChange = (e: any) => {
		const inputValue = e.target.value;
		if (inputValue.length > 19) return;

		// Remove any non-numeric characters
		const numericInput = inputValue.replace(/[^0-9]/g, "");

		// Add a dash after every 4 digits
		let formattedInput = "";
		for (let i = 0; i < numericInput.length; i++) {
			formattedInput += numericInput[i];
			if ((i + 1) % 4 === 0 && i !== numericInput.length - 1) {
				formattedInput += "-";
			}
		}

		setCard(formattedInput);
	};

	React.useEffect(() => {
      nProgress.done();
		const results = games
			.filter((game) => {
				const cartItem = cartItems.find((item: any) => item.id === game.id);
				return cartItem !== undefined;
			})
			.map((game) => {
				const cartItem = cartItems.find((item: any) => item.id === game.id);
				return { ...game, quantity: cartItem?.quantity || 0 };
			});

		setCheckoutItems(results);
	}, [cartItems]);

	// Calculate the total price
   const totalPrice = checkoutItems.reduce((total: any, item: any) => total + item.discountedPrice * item.quantity, 0).toFixed(2);
	return (
		<div className="h-[calc(100svh-156px)] sm:h-[calc(100%-73px)] flex items-center justify-center">
			<div className="bg-white p-5 shadow-md rounded-lg sm:w-[450px] fixed top-[156px] z-20 w-screen sm:h-auto h-[calc(100svh-156px)] overflow-y-auto overscroll-none">
				<h1 className="text-2xl font-semibold mb-4">Checkout</h1>
				<div className="mb-6">
					<label className="block text-gray-600">Name</label>
					<input type="text" id="name" name="name" placeholder="John Doe" className="w-full border border-gray-300 p-2 rounded" />
				</div>

				<div className="mb-6">
					<label className="block text-gray-600">Email</label>
					<input type="text" id="address" name="address" placeholder="johndoe@example.com" className="w-full border border-gray-300 p-2 rounded" />
				</div>

				<div className="mb-6">
					<label className="block text-gray-600">Card Number</label>
					<input
						type="text"
						id="cardNumber"
						value={card}
						name="cardNumber"
						placeholder="0000-0000-0000-0000"
						className="w-full border border-gray-300 p-2 rounded"
						onChange={handleCardChange}
					/>
				</div>

				<div className="flex space-x-4">
					<div className="mb-6 w-1/2">
						<label className="block text-gray-600">Expiration Date</label>
						<input
							type="text"
							id="expDate"
							name="expDate"
							value={expireDate}
							placeholder="MM/YYYY"
							className="w-full border border-gray-300 p-2 rounded"
							onChange={handleExpireDateChange}
						/>
					</div>

					<div className="mb-6 w-1/2">
						<label className="block text-gray-600">CVV</label>

						<input type="text" id="cvv" name="cvv" placeholder="123" value={cvv} className="w-full border border-gray-300 p-2 rounded" onChange={handleCvvChange} />
					</div>
				</div>

				<div className="mt-8">
					<div className="flex justify-between items-center mb-6">
						<span className="text-lg font-semibold">Total:</span>
						<span className="text-purple-600 text-xl">${totalPrice}</span>
					</div>
					<button className="w-full bg-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">
						Place Order
					</button>
				</div>
			</div>
		</div>
	);
}
