import axios from "../libs/axios.lib";
import * as loginUtils from "../utils/login.utils";

export async function getZonesAPI() {
	const token = loginUtils.getUser().token;

	const { data } = await axios.get("location/zones", {
		headers: {
			Authorization: token,
		},
	});

	return data;
}

export async function addStatesAPI(state_name, zone_id) {
	const token = loginUtils.getUser().token;

	const { data } = await axios.post(
		"location/states",
		{
			state_name,
			zone_id,
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);

	return data;
}
