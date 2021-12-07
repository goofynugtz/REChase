import { AarohanLogo } from './assets/AarohanLogo';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';


export default function Navbar ({darkMode, auth, setAuth, name}) {

  return (
    <div>
      {auth ?
        <>
          <div className='nav'>
            <div className='left'>
              <div className='brand themed-stroke'>
                <AarohanLogo darkMode={darkMode}/>
              </div>
              <div className='brand-name navlink'>
                <Link to="/">REChase</Link>
              </div>
            </div>
            <div className='right'>
              <div className='navlink'>
                <Link to="/rules">Rules</Link>
              </div>
              <div className='navlink'>
                <Link to="/leaderboard">Leaderboard</Link>
              </div>
              <div className='navlink profile' onClick={() => {
                setAuth(false)
                alert("You've been signed out");}}>
                  <div className='profile-image'></div>
                  <div>{name}</div>
              </div>
              <div className='navlink'>
                <SunMoon darkMode={darkMode} />
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className='nav'>
            <div className='left'>
              <div className='brand'>
              <AarohanLogo darkMode={darkMode}/>
              </div>
              <div className='brand-name'>
                <Link to="/">REChase</Link>
              </div>
            </div>
            <div className='right'>
              <div className='navlink'>
                <Link to="/rules">Rules</Link>
              </div>
              <div className='navlink'>
                <Link to="/leaderboard">Leaderboard</Link>
              </div>
              <div className='navlink'>
                <SunMoon darkMode={darkMode} />
              </div>
            </div>
          </div>
        </>
      }
    </div>

  )
}

const SunMoon = ({darkMode}) => {

  return (
    <div className="SunMoon" onClick={darkMode.toggle}>
      <div>{darkMode.value ? <FiSun color={'#ffc107'} /> : <FiMoon />}</div>
    </div>
  )
}