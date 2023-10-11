interface linkButtonProps {
	link: string;
	length?: number;
	index?: number;
}

export default function NavButton({ link, index, length }: linkButtonProps) {
	const marginLeft = index === 0 ? "ml-5" : "";
	const marginRight = index === length ? "mr-10" : "";
	return <button className={`text-white shrink-0 rounded-full sm:m-0 bg-neutral-800 px-3 sm:py-[2px] p-2 ${marginLeft} ${marginRight}`}>{link}</button>;
}
