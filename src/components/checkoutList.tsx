import { BiChevronDown } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCheckout, updateQuantity } from "@/redux/navr-reducer";

interface Props {
	item: any;
	index: number;
}
export default function CheckoutList({ item, index }: Props) {
	const [open, setOpen] = React.useState(false);
	const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const dispatch = useDispatch();
	const ref = React.useRef<HTMLDivElement | null>(null);

	const handleOutsideClick = (e: any) => {
		if (ref.current && ref.current == (e.target as Node)) setOpen(false);
		if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
	};

	const update = (quantity: number) => {
		dispatch(updateQuantity({ id: item.id, quantity } as any) as any);
		setOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);
	return (
		<li key={index} className="flex justify-between flex-col sm:flex-row sm:items-center py-4 border sm:border-0 border-b gap-3 bg-white px-4 border-gray-200">
			<div className="flex items-center space-x-4">
				<div className="relative w-12 h-16">
					<Image alt="Product" src={item?.image as string} fill className="rounded object-cover" sizes="(max-width:48px) 10vw" />
				</div>

				<div>
					<span className="text-gray-800 text-lg">{item.name}</span>
					<div className="text-sm text-gray-500">
						<span className="mr-2 line-through">${item.originalPrice}</span>
						<span className="text-purple-600">${item.discountedPrice}</span>
					</div>
				</div>
			</div>
			<div className="flex gap-3 items-center ">
				<div className="flex items-center space-x-2 text-base justify-between w-full">
					<span className="text-purple-600">${(item.discountedPrice * item.quantity).toFixed(2)}</span>
					<div className="flex items-center gap-3  relative">
						<div
							className="text-gray-800 cursor-pointer  border min-w-[50px] max-w-[65px]  text-center p-2 px-3 flex items-center gap-3 "
							onClick={() => {
								setOpen(true);
							}}>
							<span>{item.quantity}</span>
							<BiChevronDown size={20} className="text-purple-600 text-2xl  hover:text-purple-800 shrink-0" />
						</div>
						{open && (
							<div
								ref={ref}
								className="sm:absolute shadow-lg sm:top-[47px] sm:left-0 z-50 fixed top-0 left-0 sm:h-auto  sm:w-auto w-screen px-24 bg-black/50 grid place-items-center h-[100svh] sm:px-0">
								<div className=" bg-white transition duration-300 ease-in-out border  min-w-[50px] sm:max-w-[61px] sm:w-[61px] w-full sm:max-h-[262.5px] overflow-y-auto">
									{quantity.map((q, i) => {
										return (
											<div
												key={i}
												className={`hover:bg-purple-100 grid place-items-center cursor-pointer p-4 ${i === quantity.length - 1 ? "rounded-b-lg" : ""}`}
												onClick={() => {
													update(quantity[i]);
												}}>
												<span className="text-purple-600 text-lg">{q}</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
						<BsTrash
							size={16}
							className="text-red-600 text-2xl cursor-pointer hover:text-red-800 shrink-0"
							onClick={() => {
								dispatch(removeFromCheckout(item.id) as any);
							}}
						/>
					</div>
				</div>
			</div>
		</li>
	);
}
