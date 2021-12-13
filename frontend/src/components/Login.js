import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GoogleAuth from '../services/googleAuth';


export default function Login({
  auth,
  setAuth,
  setName,
  setEmail,
  setIsTeamed,
  setIsLeader,
  setPicture
}) {

  const successLogin = async (res) => {

    let responseCode = await GoogleAuth(res.accessToken)

    if (responseCode === 200) {
      localStorage.setItem("auth", 1)
      localStorage.setItem("name", res.profileObj.name)
      localStorage.setItem("email", res.profileObj.email)
      localStorage.setItem("picture", res.profileObj.imageUrl)
      setName(res.profileObj.name);
      setEmail(res.profileObj.email);
      setPicture(res.profileObj.imageUrl)
      setAuth(true);

    } else {
      setName('');
      setEmail('');
      setPicture('')
      setAuth(false);
      localStorage.clear();
    }
  }

  const failedLogin = async res => console.error(res)

  const successLogout = () => {
    setAuth(false);
    localStorage.clear();
    alert("You've been signed out");
  }

  let clientId = "609471501475-p162n1d9un54os08n6mqtv3n7c8amu0a.apps.googleusercontent.com"
  // cliendId = process.env.CLIENT_ID

  return (
    <div className='big-button'>
      {
        auth === false ?
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign Up / Login</button>
            )}
            onSuccess={successLogin}
            onFailure={failedLogin}
          />
          :
          <GoogleLogout
            clientId={clientId}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Log Out</button>
            )}
            onLogoutSuccess={successLogout}
          />
      }
    </div>
  )
}