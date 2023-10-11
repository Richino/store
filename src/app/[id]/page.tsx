"use client";
import { games } from "@/database";
import Image from "next/image";
import { useState } from "react";
import { addToCheckout } from "@/redux/navr-reducer";
import { useDispatch } from "react-redux";
import Link from "next/link";
import nprogress from "nprogress";
import React from "react";


interface Params {
	params: {
		id: string;
	};
}

export default function Page({ params }: Params) {
	const [game] = useState(games.find((game) => game.id === parseInt(params.id)));
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const dispatch = useDispatch();
	nprogress.configure({
		showSpinner: false,
		trickleSpeed: 200,
	});

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
	};

	const handleAddToCart = (id: string) => {
		let newID = parseInt(id);
		dispatch(addToCheckout(newID));
	};

	React.useEffect(() => {
		nprogress.done();
	}, []);

	if (!game) {
		return (
			<div className="flex flex-col items-center justify-center h-[calc(100svh-156px)] max-h-[calc(100svh-156px)] sm:h-[calc(100%-73px)] w-full border">
				<div className=" px-5 grid place-items-center">
					<h1 className="text-4xl font-bold mb-4 text-gray-800">Game Not Found</h1>
					<p className="text-lg text-gray-600">Sorry, the requested game could not be found.</p>
				</div>
			</div>
		);
	}

	return (
		<main className="bg-gray-100  sm:py-12 flex justify-center overflow-y-auto h-[calc(100svh-156px)] sm:h-[calc(100%-73px)] overscroll-none">
			<div className="sm:max-w-[1000px] w-full ">
				<div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-x-12">
					<div className="w-full">
						<div className="h-[444px] sm:w-[300px] relative sm:rounded-lg overflow-hidden overscroll-none shadow-md aspect-[4/5] w-full">
							<Image alt="Product" src={game?.image as string} fill style={{ objectFit: "cover" }} sizes="(max-width: 300px) 50vw, 100vw" priority quality={50} />
						</div>
					</div>
					<div className="px-3 pb-3">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">{game?.name}</h1>
						<h2 className="text-lg text-gray-500 font-medium mt-2">{game?.platform}</h2>
						<p className="text-gray-600 mt-3">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
							dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<div className="mt-5 flex items-center">
							<div className="text-2xl font-bold text-purple-700">{formatCurrency(game?.discountedPrice)}</div>
							{game && game.originalPrice && game.discountedPrice ? (
								<div className="ml-3 flex items-center space-x-2">
									<div className="text-xl line-through text-gray-500">{formatCurrency(game?.originalPrice)}</div>
									<div className="p-2 bg-green-200 text-green-700 text-xs rounded">
										{(((game.originalPrice - game.discountedPrice) / game.originalPrice) * 100).toFixed(0)}%
									</div>
								</div>
							) : (
								<div className="text-gray-500 ml-3">N/A</div>
							)}
						</div>

						<Link
							href="/checkout"
							onClick={() => {
								nprogress.start();
							}}>
							<button
								disabled={isButtonDisabled}
								className={`bg-purple-600  text-white py-6 text-base sm:py-3 px-6 rounded-lg mt-5 sm:transition sm:duration-300 ease-in-out sm:transform ${
									!isButtonDisabled ? "sm:hover:scale-105 sm:hover:bg-purple-700" : "sm:hover:cursor-not-allowed"
								} w-full sm:w-auto`}
								onClick={() => {
									nprogress.start();
									const cartItems = localStorage.getItem("checkout") ? JSON.parse(localStorage.getItem("checkout") as string) : [];
									const index = cartItems.findIndex((item: any) => item.id === parseInt(params.id));
									if (index !== -1) {
										cartItems[index].quantity += 1;
										localStorage.setItem("checkout", JSON.stringify(cartItems));
									} else {
										localStorage.setItem("checkout", JSON.stringify([...cartItems, { id: parseInt(params.id), quantity: 1 }]));
									}
									handleAddToCart(params.id);
									setIsButtonDisabled(true);
								}}>
								{isButtonDisabled ? "Adding to cart..." : "Add to cart"}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
