import axios from "axios";
import { Sword } from "../components/assets/Sword";
import { useState, useEffect } from "react";

export default function Leaderboard() {

  const [standings, setStandings] = useState([])
  const [selected, setSelected] = useState(null)

  
  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/leaderboard/")
    .then(res => {
      console.log(res.data.standings)
      setStandings(res.data.standings);
    })
    .catch(err => {
      console.error(err);
    })
    
    //eslint-disable-next-line
  }, [])
  
  const toggle = (i) => {
    if (selected === i)
      return setSelected(null)
    
    setSelected(i)
  }

  return (
    <div className="home">
      <div className="main">
        <div className="heading mg-t">Leaderboard</div>
        <div className="table">
          {standings.map((standing, key) => {
            return (
              <div className="table-row">
                <div className="table-row-top" onClick={() => toggle(key)}>
                  <div className="table-data rank">{standing.teamRank}</div>
                  <div className="table-data name">
                    <div className="team-image">
                      <img src={standing.teamLeader[1]} className="player-image player-top" alt="" />
                      {
                        standing.teamPlayerOne ?
                          <img src={standing.teamPlayerOne[1]} className="player-image hidden-player-one" alt="" />
                          :
                          <></>
                      }
                      {
                        standing.teamPlayerTwo ?
                          <img src={standing.teamPlayerTwo[1]} className="player-image hidden-player-two" alt="" />
                          :
                          <></>
                      }
                    </div>
                    <div className="team-name">
                      {standing.teamName}
                    </div>
                  </div>
                  {/* <div className="table-data"> ^ </div> */}
                  <div className="table-data score">{standing.teamScore}</div>
                </div>
                <div className={selected === key ? "table-row-bottom show" : "table-row-bottom"}>
                  <div className="player-row table-data">
                    <img src={standing.teamLeader[1]} className="profile-image" alt="" />
                    <div className="team-player ">{standing.teamLeader[0]}</div>
                  </div>
                  {
                    standing.teamPlayerOne ?
                      <div className="player-row table-data">
                        <img src={standing.teamPlayerOne[1]} className="profile-image" alt="" />
                        <div className="team-player">{standing.teamPlayerOne[0]}</div>
                      </div>
                      :
                      <></>
                  }
                  {
                    standing.teamPlayerTwo ?
                      <div className="player-row table-data">
                        <img src={standing.teamPlayerTwo[1]} className="profile-image" alt="" />
                        <div className="team-player">{standing.teamPlayerTwo[0]}</div>
                      </div>
                      :
                      <></>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="svg-parent themed-stroke">
        <Sword />
      </div>
    </div>
  )
}