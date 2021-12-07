import axios from "axios";

/**
 * 
 * @param {*} accesstoken This is the accesstoken of the user obtained from Google
 */

const GoogleAuth = async (accesstoken) => {
  console.log(accesstoken);
  let res = await axios.post(
    "http://localhost:8000/accounts/google/",
    {
      access_token: accesstoken,
    }
  );
  console.log(res);
  return res.status;
};

export default GoogleAuth;

// http://127.0.0.1:8000/rest-auth/google/?process=login