import Card from "./card";
import Header from "./header";
import Container from "./container";
import CardContainer from "./cardContainer";
const accessories = [
	{
		id: 100,
		title: "Viper V2 Pro Xbox Controller",
		regular_price: "$79.99",
		discounted_price: "$69.99",
		percentage_discount: "13%",
		image: "/assets/accessories/viper.png",
	},
	{
		id: 101,
		title: "PS5 Controller",
		regular_price: "$69.99",
		discounted_price: "$59.99",
		percentage_discount: "14%",
		image: "/assets/accessories/ps5.png",
	},
	{
		id: 102,
		title: "XBOX Controller",
		regular_price: "$69.99",
		discounted_price: "$59.99",
		percentage_discount: "14%",
		image: "/assets/accessories/xbox.png",
	},
	{
		id: 103,
		title: "Razer BlackWidow Keyboard",
		regular_price: "$129.99",
		discounted_price: "$109.99",
		percentage_discount: "15%",
		image: "/assets/accessories/keyboard.png",
	},
	{ id: 104, title: "Razer BlackShark Headset", regular_price: "$99.99", discounted_price: "$79.99", percentage_discount: "20%", image: "/assets/accessories/shark.png" },
];
export default function TopAccessories() {
	return (
		<Container>
			<Header title="Top accessories" type="accessories" />
			<CardContainer>
				{accessories.map((product, index) => (
					<Card key={index} product={product} accessories={true} />
				))}
			</CardContainer>
		</Container>
	);
}
