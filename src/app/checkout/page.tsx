"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { games } from "@/database";
import Link from "next/link";
import CheckoutList from "@/components/checkoutList";
import nProgress from "nprogress";

export default function CheckoutPage() {
	const cartItems = useSelector((state: RootState) => state.nav);
	const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [checkoutItems, setCheckoutItems] = React.useState<any>([]);
	const [loading, setLoading] = useState(true);

	const [paymentInfo, setPaymentInfo] = React.useState({
		cardNumber: "",
		cardName: "",
		expirationMonth: "",
		expirationYear: "",
		cvv: "",
		email: "",
	});

	const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPaymentInfo({ ...paymentInfo, [name]: value });
	};

	const handleCheckout = () => {
		// Perform the checkout process (e.g., send data to the server, handle payment)
		// You can add validation and error handling here
		console.log("Checkout completed!");
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

		setLoading(false);
	}, [cartItems]);

	// Calculate the total price
	const totalPrice = checkoutItems.reduce((total: any, item: any) => total + item.discountedPrice * item.quantity, 0).toFixed(2);

	return (
		<div className="bg-gray-100  flex flex-col items-center justify-center sm:justify-start py-0 sm:py-12 sm:flex-col sm:items-center  overflow-y-auto sm:h-[calc(100%-73px)]">
			<div
				className={`sm:bg-white p-5 rounded-lg shadow-lg w-full sm:w-[450px] overflow-y-auto sm:overflow-y-visible overscroll-none   border ${
					checkoutItems.length === 0 ? "h-[calc(100svh-156px)]" : "h-[calc(100svh-309px)]"
				}  sm:h-auto`}>
				<h2 className="text-3xl font-semibold mb-6">Checkout</h2>

				<div className="mb-6">
					{loading && checkoutItems.length === 0 ? (
						<p className="text-lg text-gray-600">Loading...</p>
					) : !loading && checkoutItems.length === 0 ? (
						<p className="text-lg text-gray-600">Your cart is empty.</p>
					) : (
						<>
							<h3 className="text-xl font-semibold mb-2">Your Cart</h3>
							<ul className="space-y-5 sm:space-y-0 ml">
								{checkoutItems.map((item: any, index: number) => {
									return <CheckoutList key={index} item={item} index={index} />;
								})}
							</ul>
						</>
					)}
				</div>

				<div className=" justify-between items-center mb-6 hidden sm:flex">
					<span className="text-lg font-semibold">Total:</span>
					<span className="text-purple-600 text-xl ">${totalPrice}</span>
				</div>

				<div className="flex flex-col justify-end sm:static fixed bottom-0 left-0 bg-white z-20 w-full sm:border-0 border-t p-5 sm:p-0 ">
					{checkoutItems.length > 0 && (
						<div className=" justify-between items-center mb-6 min-w-screen flex sm:hidden">
							<span className="text-lg font-semibold">Total:</span>
							<span className="text-purple-600 text-xl ">${totalPrice}</span>
						</div>
					)}
					{loading && checkoutItems.length === 0 ? (
						<button className="bg-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 w-full text-center sm:w-auto">
							Loading..
						</button>
					) : !loading && checkoutItems.length === 0 ? (
						<Link
							onClick={() => {
								nProgress.start();
							}}
							href="/games"
							className="bg-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 w-full text-center sm:w-auto">
							Browse to collection
						</Link>
					) : (
						<Link
							onClick={() => {
								nProgress.start();
							}}
							href="/payment"
							className="bg-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform sm:hover:scale-105 w-full text-center sm:w-auto">
							Proceed to checkout
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
