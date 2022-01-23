import axios from "axios";

export const createOrUpdateUser = async (res) => {
  return await axios.post(
    "https://api.meta-mate.pw/login",
    { res },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};
