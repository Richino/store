import Card from "./card";
import Header from "./header";
import Container from "./container";
import CardContainer from "./cardContainer";
const products = [
	{
		id: 15,
		title: "Resident Evil Village",
		regular_price: "$59.99",
		discounted_price: "$49.99",
		percentage_discount: "17%",
		image: "/assets/trending/rv.png",
	},
	{
		id: 5,
		title: "The Witcher 3: Wild Hunt",
		regular_price: "$39.99",
		discounted_price: "$19.99",
		percentage_discount: "50%",
		image: "/assets/trending/witcher.jpg",
	},
	{
		id: 9,
		title: "FIFA 22",
		regular_price: "$49.99",
		discounted_price: "$39.99",
		percentage_discount: "20%",
		image: "/assets/trending/fifa.jpg",
	},
	{
		id: 2,
		title: "Red Dead Redemption 2",
		regular_price: "$59.99",
		discounted_price: "$44.99",
		percentage_discount: "25%",
		image: "/assets/trending/rdr2.jpg",
	},
	{
		id: 8,
		title: "Among Us",
		regular_price: "$4.99",
		discounted_price: "$3.49",
		percentage_discount: "30%",
		image: "/assets/trending/a.webp",
	},
];
export default function TrendingProducts() {
	return (
		<Container>
			<Header title="Trending" type="trending" />
			<CardContainer>
				{products.map((product, index) => (
					<Card key={index} product={product} />
				))}
			</CardContainer>
		</Container>
	);
}
