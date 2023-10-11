import Card from "./card";
import CardContainer from "./cardContainer";
import Container from "./container";
import Header from "./header";

const bestSellers = [
	{
      id:1,
		title: "The Legend of Zelda: Breath of the Wild",
		regular_price: "$59.99",
		discounted_price: "$49.99",
		percentage_discount: "17%",
		image: "/assets/selling/zelda.png",
	},
	{
      id:7,
		title: "Grand Theft Auto V",
		regular_price: "$29.99",
		discounted_price: "$19.99",
		percentage_discount: "33%",
		image: "/assets/selling/gta.png",
	},
	{
      id:6,
		title: "Minecraft",
		regular_price: "$26.95",
		discounted_price: "$19.99",
		percentage_discount: "26%",
		image: "/assets/selling/minecraft.png",
	},
	{
      id: 16,
		title: "The Elder Scrolls V: Skyrim",
		regular_price: "$39.99",
		discounted_price: "$29.99",
		percentage_discount: "25%",
		image: "/assets/selling/skyrim.png",
	},
	{
      id: 200,
		title: "NBA 2K24",
		regular_price: "$49.99",
		discounted_price: "$39.99",
		percentage_discount: "20%",
		image: "/assets/selling/nba.png",
	},
];
export default function BestSellers() {
	return (
		<Container>
			<Header title="Best Seller" type="seller" />
			<CardContainer>
				{bestSellers.map((product, index) => (
					<Card key={index} product={product} />
				))}
			</CardContainer>
		</Container>
	);
}
