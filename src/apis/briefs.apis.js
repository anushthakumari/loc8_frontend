import axios from "../libs/axios.lib";
import * as loginUtils from "../utils/login.utils";

export async function getAdminsAPI() {
	const token = loginUtils.getUser().token;

	const { data } = await axios.get("admin/admins", {
		headers: {
			Authorization: token,
		},
	});

	return data;
}

export async function getControllersAPI() {
	const token = loginUtils.getUser().token;

	const { data } = await axios.get("admin/controllers", {
		headers: {
			Authorization: token,
		},
	});

	return data;
}

export async function getPlannersAPI() {
	const token = loginUtils.getUser().token;

	const { data } = await axios.get("admin/planners", {
		headers: {
			Authorization: token,
		},
	});

	return data;
}

export async function deleteUserAPI(user_id) {
	const token = loginUtils.getUser().token;

	await axios.delete("admin/admins/" + encodeURIComponent(user_id), {
		headers: {
			Authorization: token,
		},
	});

	return true;
}

export async function createBrief(formData) {
	const token = loginUtils.getUser().token;

	const { data } = await axios.post("briefs/brief", formData, {
		headers: {
			Authorization: token,
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}

export async function editUserAPI(
	user_id,
	body = {
		first_name: "",
		last_name: "",
		emp_id: "",
		email: "",
		password: "",
		role_id: 0,
	}
) {
	const token = loginUtils.getUser().token;

	const { data } = await axios.put(
		"admin/admins/" + encodeURIComponent(user_id),
		{
			...body,
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);

	return data;
}
