import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar() {
	return (
		<div className=" flex items-center rounded overflow-hidden text bg-white max-h-[36px] w-full">
			<input type="text" className="p-2 text-black outline-none w-full placeholder:text-neutral-500 bg-white  " placeholder="Search for your product" />
			<button className="px-5 p-2 bg-purple-500 h-full text-white hover:cursor-pointer">
				<IoSearchOutline size={20} />
			</button>
		</div>
	);
}
