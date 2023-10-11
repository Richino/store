"use client";
import TrendingProducts from "@/components/trendingProducts";
import Billboard from "../components/billboard";
import Pagination from "../components/pagination";
import { useEffect, useRef, useState } from "react";
import BestSellers from "@/components/bestSellers";
import GiftCards from "@/components/giftCards";
import TopAccessories from "@/components/topAccessories";

const billboard = [
	{
		title: "Cyberpunk 2077 Phantom Liberty",
		content: `Step into the gritty and neon-drenched streets of Night City, where the future meets chaos in "Cyberpunk 2077." This highly-anticipated open-world action
      role-playing game is a thrilling journey through a dystopian world dominated by technology, power, and rebellion.`,
		image: "/assets/cyberpunk.jpg",
	},
	{
		title: "Mortal Kombat 1",
		content:
			"Discover a reborn Mortal Kombat Universe created by the Fire God Liu Kang. Mortal Kombat 1 ushers in a new era of the iconic franchise with a new fighting system, game modes, and fatalities!",
		image: "/assets/mk1.jpg",
	},
	{
		title: "Starfield",
		content: "Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4.",
		image: "/assets/starfield.png",
	},
];

export default function Home() {
	const [current, setCurrent] = useState(0);
	const [touchEnabled, setTouchEnabled] = useState(true);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const update = (page: number) => {
		const element = document.getElementById(`billboard-${page}`);
		const container = document.querySelector(".billboard-scroll");
		if (element && container) {
			container.scrollTo({
				left: element.offsetLeft,
				behavior: "smooth",
			});
			setCurrent(page);
		}
	};

	useEffect(() => {
		const container = containerRef.current;
		let interval: NodeJS.Timeout;

		if (container) {
			container.addEventListener("scroll", () => {
				const index = Math.round(container.scrollLeft / container.clientWidth);
				setCurrent(index);
			});
			interval = setInterval(() => {
				const nextIndex = (current + 1) % billboard.length;
				update(nextIndex);
			}, 4500);
		}
		return () => {
			clearInterval(interval);
		};
	}, [current]);
	return (
		<main className=" gap-5 w-full sm:w-full  flex flex-col items-center pb-5 overflow-x-hidden sm:h-[calc(100%-73px)] h-[calc(100svh-156px)]  overscroll-none sm:overscroll-auto overflow-y-auto">
			<div className="relative w-full flex justify-center">
				<div
					ref={containerRef}
					className="overflow-hidden overscroll-none sm:overscroll-auto overflow-x-auto sm:aspect-video  aspect-[4/5]  billboard-scroll snap-x snap-mandatory  flex  bg-neutral-950 sm:w-[1000px] w-full">
					{billboard.map((billboard, index) => (
						<Billboard key={index} billboard={billboard} index={index} />
					))}
				</div>
				<div className="absolute bottom-10 flex items-center justify-center w-full z-40 gap-3 ">
					<Pagination total={billboard.length} current={current} onChange={update} />
				</div>
			</div>
			<TrendingProducts />
			<BestSellers />
			<GiftCards />
			<TopAccessories />
		</main>
	);
}
