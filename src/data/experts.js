import Axios from "axios";
import { BASE_URL } from "../constant";

export const getExpertProfile = async (userId) => {
  try {
    const data = await Axios.get(`${BASE_URL}expert/get/profile/${userId}`);
    return data.data;
  } catch (error) {
    return error.message;
  }
};
