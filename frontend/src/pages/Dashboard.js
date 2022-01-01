import { Map } from "../components/assets/Map";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Dashboard({
  name,
  email,
  picture,
  isTeamed, setIsTeamed,
  teamCode, setTeamCode,
  teamName, setTeamName,
  isLeader, setIsLeader,
  score, setScore,
  level, setLevel,
  darkMode
}) {

  useEffect(() => {
    async function fetchData() {
      axios.post("http://localhost:8000/dashboard/", {
        "name": name,
        "email": email,
        "picture": picture
      }).then(res => {
        // console.log(picture)
        setIsLeader(res.data.profile.isLeader)
        setLevel(res.data.profile.level)
        setScore(res.data.profile.score)
        setIsTeamed(res.data.profile.isTeamed)
        if (res.data.profile.isTeamed)
          setTeamCode(res.data.profile.teamCode)
          setTeamName(res.data.profile.teamName)
  
        if (res.status === 302)
          console.log("Welcome Back!");
  
      }).catch(error => {
        console.error(error)
      })
    }

    fetchData()
    //eslint-disable-next-line
  }, [level])


  return (
    <section className="home">
      <div className="main center">
        <div className="intro">
          Hi, {name},
        </div>
        <div className="details">
          <div className="team-details">Your team code is <br />
            <span className="accent big">{teamCode}</span>
          </div>
          <div className="team-details"> Team Name <br />
            <span className="accent big">{teamName}</span>
          </div>
          <div className="team-details-alt">
            Currently,
            <br />
            You're at level
            <span className="accent big">{level}</span>
          </div>
          <div className="team-details-alt">
            Your
            <br />
            Team Score
            <span className="accent big">{score}</span>
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
