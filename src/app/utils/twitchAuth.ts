import axios from "axios";

export async function authenticateWithTwitch() {
	try {
		const response = await axios.post(
			"https://id.twitch.tv/oauth2/token",
			null, // No request body is needed for this grant type
			{
				params: {
					client_id: "5lb2hk8wezxexxs796g7cbw6bmnlze",
					client_secret: "t84aj125t9ru8729vmjz899mhlicbq",
					grant_type: "client_credentials",
				},
				withCredentials: true, // Include this line for credentials
			}
		);

		// Check if the response contains the access token
		if (response.data && response.data.access_token) {
			return response.data.access_token;
		} else {
			throw new Error("Access token not found in the response.");
		}
	} catch (error) {
		console.error("Error authenticating with Twitch:", error);
		throw error;
	}
}
