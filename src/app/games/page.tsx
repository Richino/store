"use client";
import { BsCheck, BsFilter } from "react-icons/bs";
import { games } from "../../database";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { fetchIGDBData } from "../utils/igdb";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import nProgress from "nprogress";

interface Console {
	name: string;
	count: number;
	clicked: boolean;
	active: boolean;
}
const consolesData: Console[] = [
	{
		name: "Playstation",
		count: 15282,
		clicked: false,
		active: true,
	},
	{
		name: "Xbox",
		count: 6850,
		clicked: false,
		active: false,
	},
	{
		name: "Nintendo",
		count: 14567,
		clicked: false,
		active: false,
	},
	{
		name: "PC",
		count: 22470,
		clicked: false,
		active: false,
	},
	{
		name: "VR",
		count: 375,
		clicked: false,
		active: false,
	},
	{
		name: "Mobile",
		count: 892,
		clicked: false,
		active: false,
	},
];

const categoriesData = [
	{
		name: "All",
		count: 15282,
		clicked: false,
		active: true,
	},
	{
		name: "Action",
		count: 15282,
		clicked: false,
		active: false,
	},
	{
		name: "Adventure",
		count: 6850,
		clicked: false,
		active: false,
	},
	{
		name: "Fps",
		count: 14567,
		clicked: false,
		active: false,
	},
	{
		name: "Indie",
		count: 22470,
		clicked: false,
		active: false,
	},
	{
		name: "Casual",
		count: 375,
		clicked: false,
		active: false,
	},
	{
		name: "MMO",
		count: 892,
		clicked: false,
		active: false,
	},
];

const dropdownData = ["Best Match", "Price: Low to High", "Price: High to Low", "Release Date: Newest First", "Release Date: Oldest First", "Title: A-Z", "Title: Z-A"];

export default function GamesPage() {
	const [consoles, setConsoles] = useState(consolesData);
	const [categories, setCategories] = useState(categoriesData);
	const [dropdown, setDropdown] = useState(dropdownData);
	const [overlay, setOverlay] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const handleConsoleClick = (index: number) => {
		const updatedConsoles = [...consoles];
		updatedConsoles[index].active = !updatedConsoles[index].active;
		setConsoles(updatedConsoles);
	};

	const handleCategoryClick = (index: number) => {
		const updatedCategories = categories.map((category, i) => ({
			...category,
			active: i === index ? true : false,
		}));
		setCategories(updatedCategories);
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		nProgress.done();

		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<div className="flex flex-col relative pb-5 overflow-x-hidden bg-gray-100 items-center h-[calc(100svh-156px)] sm:h-[calc(100%-73px)] ">
			<div className="fixed bottom-5 right-5  bg-purple-600 px-4 py-3  cursor-pointer z-30 rounded-md flex items-center text-white text-sm sm:hidden" onClick={() => setOverlay(true)}>
				<BsFilter size={25} />
				<span>Filter and sort</span>
			</div>
			<div className="py-5 max-w-[1000px] w-full flex justify-between items-center">
				<span className="text-3xl font-semibold px-3 sm:px-0">Video Game Keys</span>
				<div className=" gap-2 items-center text-sm hidden sm:flex ">
					<span className="font-semibold">Sort by</span>
					<div className="relative">
						<div
							className="border w-[200px] px-2 py-1 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-200"
							onClick={() => setIsDropdownOpen(true)}>
							<span>{dropdown[0]}</span>
							<BiChevronDown size={15} />
						</div>
						{isDropdownOpen && (
							<div ref={ref} className="absolute top-[40px] left-0 w-[200px] border bg-white z-10 shadow-lg">
								{dropdown.map((item, index) => {
									if (index !== 0) {
										return (
											<div
												key={index}
												className="px-2 py-1 cursor-pointer hover:bg-slate-50"
												onClick={() => {
													setIsDropdownOpen(false);
													setDropdown([item, ...dropdown.filter((_, i) => i !== index)]);
												}}>
												{item}
											</div>
										);
									}
								})}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex sm:max-w-[1000px] w-full gap-5 sm:p-5  ">
				<div
					className={`${
						overlay ? "z-50" : "z-10"
					} sm:w-[400px] flex flex-col sm:static sm:h-auto gap-5 fixed sm:bg-transparent bg-white  w-full top-[156px] h-[calc(100svh-156px)] px-3 py-3 overscroll-none overflow-y-auto`}>
					<div className="flex flex-col gap-3 ">
						<span className="font-semibold py-[2px]">Devices</span>
						<div className="flex flex-col text-sm gap-0">
							{consoles.map((console, index) => (
								<div
									key={index}
									className={`flex justify-between items-center py-2 cursor-pointer ${console.active && "group"}`}
									onClick={() => handleConsoleClick(index)}>
									<div className="flex gap-2 items-center">
										<div
											className={`overflow-hidden rounded-sm border min-w-[17px] min-h-[17px] h-[17px] grid place-items-center transition-colors ${
												console.active && "bg-purple-500 border-purple-500"
											}`}>
											{console.active && <BsCheck className="text-white" size={15} />}
										</div>
										<span className={`${console.active && "font-semibold"}`}>{console.name}</span>
									</div>
									<span className="text-neutral-500">{console.count}</span>
								</div>
							))}
						</div>
						<hr />
					</div>
					<div className="flex flex-col gap-0">
						<span className="font-semibold py-[2px]">Categories</span>
						{categories.map((category, index) => (
							<div
								key={index}
								className={`flex justify-between items-center py-2 cursor-pointer text-sm ${category.active && "group"}`}
								onClick={() => handleCategoryClick(index)}>
								<span className={`${category.active && "font-semibold hover:underline"}`}>{category.name}</span>
								<span className="text-neutral-500">{category.count}</span>
							</div>
						))}
						<hr />
					</div>
					<div className="flex flex-col gap-2">
						<span className="font-semibold">Price</span>
						<div className="flex items-center gap-5">
							<input
								type="number"
								className="p-2 w-full border outline-purple-500 placeholder-text-neutral-400"
								placeholder="From"
								style={{ WebkitAppearance: "none" }}
							/>
							<span>-</span>
							<input
								type="number"
								className="p-2 w-full border outline-purple-500 placeholder-text-neutral-400"
								placeholder="To"
								style={{ WebkitAppearance: "none" }}
							/>
						</div>
					</div>
					<button
						className="bg-purple-600 sm:hover:bg-purple-700 text-white py-6 text-base sm:py-3 px-6 rounded-lg mt-5 sm:transition sm:duration-300 ease-in-out sm:transform sm:hover:scale-105 w-full sm:w-auto"
						onClick={() => setOverlay(false)}>
						Apply changes
					</button>
				</div>
				<div className="w-full border bg-white z-20 top-[156px] fixed overscroll-none overflow-y-auto h-[calc(100svh-156px)] sm:static sm:h-auto pb-[121px]">
					{games.map((game, index) => (
						<Link
							href={`${game.id}`}
							key={index}
							className="border-b p-5 flex justify-between sm:hover:bg-gray-100 cursor-pointer"
							onClick={() => {
								nProgress.start();
							}}>
							<div className="flex gap-5 items-center">
								<Image
									height={80}
									width={60}
									alt={game.name}
									src={game.image}
									className="max-h-[80px] min-h-[80px] max-w-[60px] min-w-[60px] object-cover rounded"
									sizes="(max-width: 60px) 100vw"
								/>
								<div>
									<h2 className="text-lg font-medium">{game.name}</h2>
									<p className="text-sm text-gray-500">{game.platform}</p>
								</div>
							</div>
							<div className="flex flex-col items-end">
								<span className="text-lg font-semibold">${game.discountedPrice}</span>
								<span className="line-through text-gray-500 text-xs">${game.originalPrice}</span>
								<span className="p-1 px-2 rounded bg-green-200 text-green-700 text-xs">
									{(((game.originalPrice - game.discountedPrice) / game.originalPrice) * 100).toFixed(0)}%
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
