import Image from "next/image";
import Link from "next/link";
import nprogress from "nprogress";

interface Product {
	id: number;
	title: string;
	regular_price: string;
	discounted_price: string;
	percentage_discount: string;
	image: string;
}

interface Props {
	product: Product;
	accessories?: boolean;
}

export default function Card({ product, accessories }: Props) {
	return (
		<Link
			href={`/${product.id}`}
			onClick={() => {
				nprogress.start();
			}}
			className="flex flex-col max-w-[186px] min-w-[186px] border bg-white rounded shadow-md hover:shadow-lg cursor-pointer sm:transition-transform sm:transform sm:hover:scale-105 overflow-hidden">
			{accessories ? (
				<div className="h-[270px] grid place-items-center">
					<div className={`overflow-hidden min-h-[120px] w-full h-[120px] relative grid place-items-center`}>
						<Image alt="Product" src={product.image} fill style={{ objectFit: "contain" }} priority sizes="(max-width: 264px) 50vw, 100vw" quality={50} />
					</div>
				</div>
			) : (
				<div className={`overflow-hidden max-h-[280px] max-w-[264px] h-[270px] relative grid place-items-center`}>
					<Image alt="Product" src={product.image} fill style={{ objectFit: "cover" }} priority sizes="(max-width: 264px) 50vw, 100vw" quality={50} />
				</div>
			)}
			<div className="flex flex-col p-3 justify-between flex-grow gap-2">
				<span className="text-xl font-semibold">{product.title}</span>
				<div>
					<h1 className="text-sm font-medium">{product.discounted_price}</h1>
					<div className="flex items-center gap-2 text-sm font-medium">
						<span className="line-through text-neutral-500">{product.regular_price}</span>
						<span className="border p-1 px-2 rounded bg-green-200 text-green-700">{product.percentage_discount}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
