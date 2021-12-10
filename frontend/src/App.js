import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

import { Island } from './components/assets/Island';
import { Path1 } from './components/assets/ArrowPath';

import Navbar from './components/Navbar';

import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Rules from './pages/Rules';
import Leaderboard from './pages/Leaderboard';
import Question from './pages/Question';
import { SignInRequired } from './pages/SignInRequired';

function App() {

  const darkMode = useDarkMode(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("auth") !== null)
      setAuth(localStorage.getItem("auth"))
      setName(localStorage.getItem("name"))
      setEmail(localStorage.getItem("email"))
      setPicture(localStorage.getItem("picture"))
  }, [])

  return (
    <div className="App">

      <div className="path1 themed-stroke">
        <Path1 />
      </div>
      <Navbar darkMode={darkMode}
        {...{ auth, setAuth }}
        {...{ name }}
        {...{ picture }}
      />
      <Routes>
        {
          auth ?
            <Route path="/" element={<Dashboard
              name={name}
              {...{ email }}
              {...{ picture }}
              {...{ level, setLevel }}
              {...{ darkMode }}
            />} />
            :
            <Route path="/" element={
              <Homepage
                auth={auth}
                {...{ setAuth }}
                {...{ setName }}
                {...{ setEmail }}
                {...{ setPicture }}
              />} />
        }
        <Route path="/rules" element={<Rules />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        {
          auth ?
            <Route path="/hunt/" element={
              <Question level={level}
                {...{ setLevel }}
                {...{ email }}
              />} />
            :
            <Route path="/hunt/" element={<SignInRequired />} />
        }
      </Routes>
      <div className='island'>
        <Island darkMode={darkMode} />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
