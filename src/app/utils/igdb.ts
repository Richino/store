import axios from "axios";
import { authenticateWithTwitch } from "./twitchAuth";

export async function fetchIGDBData() {
	try {
		const accessToken = await authenticateWithTwitch();
		console.log("accessToken", accessToken);

		const url = "https://api.igdb.com/v4/games?fields=name,summary&limit=10";

		const response = await axios.post(
			url,
			{
				// You can include a request body if necessary
				// Add any request parameters here
			},
			{
				headers: {
					"Client-ID": "5lb2hk8wezxexxs796g7cbw6bmnlze",
					Authorization: "Bearer " + accessToken,
					"Content-Type": "application/json",
				},
			},
		);

		if (!response.data) {
			throw new Error(`No data received from the server`);
		}

		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}
