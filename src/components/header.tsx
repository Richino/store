import Link from "next/link";

interface Props {
	title: string;
	type: string;
}

export default function Header({ title, type }: Props) {
	return (
		<div className="flex justify-between items-center sm:px-0 px-5">
			<h1 className="text-3xl font-semibold">{title}</h1>
			<Link href={`/games/`} className="text-gray-100 bg-purple-500 hover:bg-purple-700 font-semibold py-1 px-3 rounded transition-colors duration-300">
				View all
			</Link>
		</div>
	);
}
