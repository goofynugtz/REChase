import axios from "axios";

const GoogleAuth = async (accesstoken) => {
  let res = await axios.post(
    "http://localhost:8000/accounts/google/",
    {
      access_token: accesstoken,
    }
  );
  return res.status;
};

export default GoogleAuth;