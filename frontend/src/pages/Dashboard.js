import { Map } from "../components/assets/Map";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Dashboard({ 
  name, 
  email, 
  picture,
  level,
  setLevel, 
  darkMode }) {

  useEffect(() => {
      axios.post("http://localhost:8000/dashboard/", {
        "name": name,
        "email": email,
        "picture": picture
      }).then(res => {
        
        setLevel(res.data.profile[0].level)

        if (res.status === 400)
          console.error("BAD REQUEST: ", res);
        
        if (res.status === 302)
          console.log("Welcome Back!");
        
      }).catch(error => {
        console.error(error)
      })
    
      //eslint-disable-next-line
  }, [level])

  return (
    <section className="home">
      <div className="main center">
        <div className="intro">
          Hi, {name},
        </div>
        <div className="desc">
          <div className="level">
            Currently,
            <br />
            You're at level
            <span className="accent big">{level}</span>
          </div>
          <div className="time-played">
            Time Played <span className="accent big">2</span> hrs <span className="accent big">17</span> mins
          </div>
        </div>
        <div className="big-button">
          <Link to="/hunt/" >
            <button>Continue</button>
          </Link>
        </div>
      </div>
      <div className="svg-parent">
        <Map darkMode={darkMode} />
      </div>
    </section>
  )
}
