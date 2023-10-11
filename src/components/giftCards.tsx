import Card from "./card";
import CardContainer from "./cardContainer";
import Container from "./container";
import Header from "./header";

const giftCards = [
	{
		id: 100,
		title: "PlayStation Store Gift Card",
		regular_price: "$50.00",
		discounted_price: "$45.00",
		percentage_discount: "10%",
		image: "/assets/giftcards/ps.jpg",
	},
	{
		id: 101,
		title: "Xbox Live Gold Membership",
		regular_price: "$59.99",
		discounted_price: "$49.99",
		percentage_discount: "17%",
		image: "/assets/giftcards/xbox.jpg",
	},
	{ id: 102, title: "Steam Wallet Gift Card", regular_price: "$25.00", discounted_price: "$20.00", percentage_discount: "20%", image: "/assets/giftcards/steam.jpeg" },
	{
		id: 103,
		title: "Nintendo eShop Gift Card",
		regular_price: "$35.00",
		discounted_price: "$30.00",
		percentage_discount: "14%",
		image: "/assets/giftcards/nintendo.jpg",
	},
	{
		id: 104,
		title: "Fortnite V-Bucks Gift Card",
		regular_price: "$20.00",
		discounted_price: "$18.00",
		percentage_discount: "10%",
		image: "/assets/giftcards/epic.jpg",
	},
];
export default function GiftCards() {
	return (
		<Container>
			<Header title="Popular gift cards" type="cards" />
			<CardContainer>
				{giftCards.map((product, index) => (
					<Card key={index} product={product} />
				))}
			</CardContainer>
		</Container>
	);
}
