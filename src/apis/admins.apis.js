import axios from "../libs/axios.lib";
import * as loginUtils from "../utils/login.utils";

export async function getAdminsAPI() {
	const token = loginUtils.getUser().token;

	const { data } = await axios.get("admins", {
		headers: {
			Authorization: token,
		},
	});

	return data;
}
