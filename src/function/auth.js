import axios from "axios";

export const login = async (form) => {
  return await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, form, {
    headers: {
      "Accept": "application/json",
    },
  });
};
