import React, { useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GoogleAuth from '../services/googleAuth';


export default function Login({auth, setAuth, name, setName}) {

  console.log("auth from App in Login: ", auth);
  console.log("name from App in login: ", name);

  const loginResponse = async (res) => {
    console.log("Response from Google: ", res);
    let responseCode = await GoogleAuth(res.accessToken)
    console.log(responseCode);

    if (responseCode === 200) {
      setAuth(true);
      setName(res.profileObj.givenName);
    } else {
      setAuth(false);
    }
  }

  const logoutResponse = () => {
    setAuth(false);
    alert("You've been signed out");
  }


  useEffect(() => {
    const authentication = {
      "auth": auth,
      "name": name
    }
    window.sessionStorage.setItem("authentication", authentication);
  }, [auth, name]);


  let clientId = "609471501475-p162n1d9un54os08n6mqtv3n7c8amu0a.apps.googleusercontent.com"

  return (
    <div className='big-button'>
      {
        auth === false ?
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign Up / Login</button>
            )}
            onSuccess={loginResponse}
            onFailure={loginResponse}
          />
          :
          <GoogleLogout
            clientId={clientId}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Log Out</button>
            )}
            onLogoutSuccess={logoutResponse}
          />
      }
    </div>
  )
}
