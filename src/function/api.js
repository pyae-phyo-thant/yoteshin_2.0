import axios from "axios";

export const getData = async (token, userId) => {
  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/data`, {
    headers: {
      accessToken: token,
      id: userId,
    },
  });
};

export const getSingleData = async (name) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/drive?slug=${name}`
  );
};
