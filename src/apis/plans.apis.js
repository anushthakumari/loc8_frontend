import axios from "../libs/axios.lib";
import * as loginUtils from "../utils/login.utils";

export async function addPlanAPI(body = {}) {
  const token = loginUtils.getUser().token;

  const { data } = await axios.post(
    "plans/plans",
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
