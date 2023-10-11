import axios from "axios";

const giantBombAPI = axios.create({
	baseURL: "https://www.giantbomb.com/api",
});

export const searchGamesByName = async (name: string) => {
	try {
		const response = await giantBombAPI.get("/games", {
			params: {
				api_key: "cf24fabb40ecb8d788902f8cfcfb58ea09f612a4",
				format: "json",
				filter: `name:${name}`,
			},
		});

		return response.data;
	} catch (error) {
      console.log(error);
		throw new Error("Error fetching game data from Giant Bomb API");
	}
};

export default giantBombAPI;
