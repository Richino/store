import NavButton from "./navButton";
import SearchBar from "./searchBar";
import { Press_Start_2P } from "next/font/google";
import { BsCart } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { inititateCheckout } from "@/redux/navr-reducer";
import nprogress from "nprogress";

const links = ["PC", "PS4", "XBOX", "NINTENDO", "SALE", "DAILY DEALS", "GIFT CARDS", "ACCESESSORIES"];
const font = Press_Start_2P({
	subsets: ["latin"],
	weight: "400",
});

export default function Nav() {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.nav);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const checkoutItems = localStorage.getItem("checkout");
			if (checkoutItems) dispatch(inititateCheckout(JSON.parse(checkoutItems)));
		}
	}, []);
	return (
		<div className="sm:p-5 sm:py-2 bg-neutral-950 py-3 w-full   flex flex-col items-center">
			<div className="lg:min-w-[1000px] lg:max-w-[1000px] w-full flex flex-col gap-3 ">
				<div className="flex gap-2 justify-between items-center">
					<Link href="/">
						<h1 className={`${font.className} text-white lg:text-2xl lg:max-w-[150px] text-center pl-5 sm:p-0 text-base`}>GAMING KEYS</h1>
					</Link>

					<div className="flex flex-col gap-2 ">
						<div className="hidden sm:block">
							<SearchBar />
						</div>
						<div className="sm:flex min-w-[610px] justify-between text-xs gap-4 hidden">
							{links.map((link, index) => (
								<NavButton key={index} link={link} />
							))}
						</div>
					</div>
					<div className="flex gap-2 mr-5 sm:mr-0">
						<div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:cursor-pointer">
							<BiUser size={15} className="text-white" />
						</div>
						<div className="relative">
							<div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:cursor-pointer">
								<BsCart size={15} className="text-white" />
								{cart.length > 0 && (
									<Link onClick={()=>{
                              nprogress.start()
                           }} href={"/checkout"} className="absolute  -top-[5px] left-[27px] bg-purple-500 text-white rounded-full  min-w-[22px] min-h-[12px] p-[4px]  flex items-center justify-center text-xs">
										{cart.reduce((acc: any, curr: any) => acc + curr.quantity, 0)}
									</Link>
                        )}
							</div>
						</div>
					</div>
				</div>
				<div className="sm:hidden px-5">
					<SearchBar />
				</div>
				<div className="flex  justify-between text-xs gap-2 nav sm:hidden overflow-x-scroll hide-scrollbar pr-5">
					{links.map((link, index) => (
						<NavButton key={index} link={link} length={links.length - 1} index={index} />
					))}
				</div>
			</div>
		</div>
	);
}
