import { Map } from "../components/assets/Map";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard({
  name,
  email,
  picture,
  isTeamed, setIsTeamed,
  isLeader, setIsLeader,
  level, setLevel,
  darkMode
}) {
  
  const [teamCode, setTeamCode] = useState('')
  
  useEffect(() => {
    axios.post("http://localhost:8000/dashboard/", {
      "name": name,
      "email": email,
      "picture": picture
    }).then(res => {
      // console.log(picture)
      setLevel(res.data.profile.level)
      setIsTeamed(res.data.profile.isTeamed)
      setIsLeader(res.data.profile.isLeader)
      if (res.data.profile.isLeader)
        setTeamCode(res.data.profile.teamCode)

      if (res.status === 302)
        console.log("Welcome Back!");

    }).catch(error => {
      console.error(error)
    })

    //eslint-disable-next-line
  }, [level, isLeader])


  return (
    <section className="home">
      <div className="main center">
        <div className="intro">
          Hi, {name},
        </div>
        <div className="desc">
          {
            isLeader ?
              <div className="team-code">Your team code is <br />
                <span className="accent big">{teamCode}</span>
              </div>
              :
              <></>
          }
          <div className="level">
            Currently,
            <br />
            You're at level
            <span className="accent big">{level}</span>
          </div>
          {/* <div className="time-played">
            Time Played <span className="accent big">2</span> hrs <span className="accent big">17</span> mins
          </div> */}
        </div>
        {
          isTeamed ?
            <div className="big-button">
              <Link to="/hunt/" >
                <button>Continue</button>
              </Link>
            </div>
            :
            <div className="team-option">
              <div className="create-team medium-button">
                <Link to="createTeam/">Create Team</Link>
              </div>
              <div className="join-team medium-button">
                <Link to="joinTeam/">Join Team</Link>
              </div>
            </div>
        }
      </div>
      <div className="svg-parent">
        <Map darkMode={darkMode} />
      </div>
    </section>
  )
}
