import axios from "../libs/axios.lib";
import * as loginUtils from "../utils/login.utils";

export async function addVideosAPI(fd) {
  const token = loginUtils.getUser().token;

  const { data } = await axios.post("videos/upload", fd, {
    headers: {
      Authorization: token,
      "Content-Type": "application/form-data",
    },
  });

  return data;
}
