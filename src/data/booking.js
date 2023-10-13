import Axios from "axios";
import { BASE_URL } from "../constant";

export const getAllmeetings = async (tabStatus) => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  try {
    const res = await Axios.get(
      `${BASE_URL}booking/get-all?tabStatus=${tabStatus}&userId=${userId}&role=${role}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getSingleBookingDetail = async (bookingId) => {
  try {
    const res = await Axios.get(`${BASE_URL}booking/single/${bookingId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getCategoryList = async (parent, search = null) => {
  console.log("parent", parent);

  try {
    let res;
    if (parent && !search) {
      res = await Axios.get(`${BASE_URL}category/get-all?parent=${parent}`);
    }
    if (!parent && search) {
      res = await Axios.get(`${BASE_URL}category/get-all?parent=${parent}`);
    }
    if (parent && search) {
      res = await Axios.get(
        `${BASE_URL}category/get-all?parent=${parent}&search=${search}`
      );
    }
    if (!parent && !search) {
      res = await Axios.get(`${BASE_URL}category/get-all`);
    }
    return res.data;
  } catch (error) {
    return error;
  }
};

export const listExpert = async (search, jobCategory) => {
  try {
    let url = `${BASE_URL}expert/get/all`;
    if (search && !jobCategory) {
      url = url + `?search=${search}`;
    }
    if (!search && jobCategory) {
      url = url + `?jobCategory=${jobCategory}`;
    }
    if (jobCategory && search) {
      url = url + `?search=${search}&jobCategory=${jobCategory}`;
    }
    const experts = await Axios.get(url);
    return experts.data;
  } catch (error) {
    return error.message;
  }
};

export const createBooking = async (data) => {
  try {
    const res = await Axios.post(`${BASE_URL}booking/create`, { ...data });
    console.log(res);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
