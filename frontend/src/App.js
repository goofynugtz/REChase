import './App.css';
import { useState } from 'react';
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

function App() {

  const darkMode = useDarkMode(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  
  let experimental = 1;

  return (
    <div className="App">
      {experimental ?
        <>
          <div className="path1 themed-stroke">
            <Path1 />
          </div>
          <Navbar darkMode={darkMode} {...{ auth, setAuth }} {...{ name }} />
          <Routes>
            {
              auth ?
                <Route path="/" element={<Dashboard name={name} {...{ darkMode }}/>} />
                :
                <Route path="/" element={
                  <Homepage
                    auth={auth}
                    {...{ setAuth }}
                    {...{ name }}
                    {...{ setName }}
                  />} />
            }
            <Route path="/rules" element={<Rules />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/hunt/level0" element={<Question />} />
          </Routes>
          <div className='island'>
            <Island darkMode={darkMode} />
          </div>
          {/* <Footer /> */}
        </>
        :
        <>
          <Navbar darkMode={darkMode} {...{ auth, setAuth }} {...{ name }} />
          <Routes>
            {
              auth ?
                <Route path="/" element={<Dashboard name={name} {...{ darkMode }}/>} />
                :
                <Route path="/" element={
                  <Homepage
                    auth={auth}
                    {...{ setAuth }}
                    {...{ name }}
                    {...{ setName }}
                  />} />
            }
            <Route path="/rules" element={<Rules />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/hunt/level0" element={<Question />} />
          </Routes>
          {/* <Footer /> */}
        </>
      }
    </div>
  );
}

export default App;
