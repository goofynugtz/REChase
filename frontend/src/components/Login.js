import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GoogleAuth from '../services/googleAuth';


export default function Login({
  auth,
  setAuth,
  name,
  setName,
  email,
  setEmail,
  picture,
  setPicture
}) {

  const loginResponse = async (res) => {
    console.log("res profile from google: ", res.profileObj.name);

    let responseCode = await GoogleAuth(res.accessToken)

    if (responseCode === 200) {
      setName(res.profileObj.name);
      setEmail(res.profileObj.email);
      setPicture(res.profileObj.imageUrl)
      setAuth(true);

    } else {
      setName('');
      setEmail('');
      setPicture('')
      setAuth(false);
    }
  }

  const logoutResponse = () => {
    setAuth(false);
    alert("You've been signed out");
  }


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