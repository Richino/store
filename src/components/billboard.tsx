import Image from "next/image";

interface Props {
	title: string;
	content: string;
	image: string;
}

interface BillboardProps {
	billboard: Props;
	index: number;
}

export default function Billboard({ billboard, index }: BillboardProps) {
	return (
		<div id={`billboard-${index}`} className="shrink-0 w-full relative h-full snap-start">
			<div className="absolute top-0 left-0 h-full bg-black/50 z-10 text-white sm:p-10 p-5 flex items-center w-full">
				<div className="sm:w-[40%] space-y-5 w-full">
					<h1 className="text-4xl font-bold">{billboard.title}</h1>
					<p className="font-medium">{billboard.content}</p>
					<button className="bg-white h-[40px] w-[160px] rounded text-purple-500 font-semibold transition duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg">
						Buy now
					</button>
				</div>
			</div>
			<Image alt="billboard" src={billboard.image} fill style={{ objectFit: "cover" }} sizes="(max-width: 1000px) 50vwm 100vw" priority quality={50}/>
		</div>
	);
}
