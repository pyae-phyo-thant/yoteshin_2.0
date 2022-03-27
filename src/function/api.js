import axios from "axios";

export const getData = async (token, userId) => {
  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/drives`, {
    headers: {
      Authorization: `Bearer ${token}`,
      id: userId,
    },
  });
};

export const getUser = async (token, userId) => {
  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      id: userId,
    },
  });
};

export const getSingleData = async (name) => {
  return await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/drives/slug/${name}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

export const addFile = async (token, form) => {
  return await axios.post(`${import.meta.env.VITE_APP_API_URL}/drives`, form, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postDownCount = async (form, id) => {
  return await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/add-down-count/${id}`,
    form,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

export const postAds = async (token, form) => {
  return await axios.post(`${import.meta.env.VITE_APP_API_URL}/ads`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAds = async (token) => {
  return await axios.get(`${import.meta.env.VITE_APP_API_URL}/ads`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAds = async (token, adsId, form) => {
  return await axios.put(
    `${import.meta.env.VITE_APP_API_URL}/ads/${adsId}`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
