import axios from "axios";

export const getData = async (token, userId) => {
  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/data`, {
    headers: {
      accessToken: token,
      id: userId,
    },
  });
};

export const getUser = async (token, userId) => {
  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/get-user`, {
    headers: {
      accessToken: token,
      id: userId,
    },
  });
};

export const getSingleData = async (name) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/drive?slug=${name}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

export const postDownCount = async (form) => {
  return await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/down-count`,
    form,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

export const postAds = async (token, userId, form) => {
  return await axios.post(`${import.meta.env.VITE_APP_API_URL}/ads`, form, {
    headers: {
      accessToken: token,
      id: userId,
    },
  });
};

export const getAds = async (userId) => {
  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/ads`, {
    headers: {
      id: userId,
    },
  });
};

export const updateAds = async (token, userId, form) => {
  return await axios.put(`${import.meta.env.VITE_APP_API_URL}/ads`, form, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      accessToken: token,
      id: userId,
    },
  });
};
