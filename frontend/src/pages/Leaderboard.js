import axios from "axios";
import { Sword } from "../components/assets/Sword";
import { useState, useEffect } from "react";

export default function Leaderboard() {

  const [standings, setStandings] = useState([])

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

  return (
    <div className="home">
      <div className="main">
        <div className="heading mg-t">Leaderboard</div>
        <div className="table">
          {standings.map((standing, key) => {
            return (
              <div className={`table-row ${key}`}>
                <div className="table-row-top">
                  <div className="table-data rank">{standing.teamRank}</div>
                  <div className="table-data name">
                    <img src={standing.teamLeader[1]} className="profile-image" alt="" />
                    {
                      standing.teamPlayerOne ?
                        <img src={standing.teamPlayerOne[1]} className="profile-image" alt="" />
                        :
                        <></>
                    }
                    {
                      standing.teamPlayerTwo ?
                        <img src={standing.teamPlayerTwo[1]} className="profile-image" alt="" />
                        :
                        <></>
                    }
                    {standing.teamName}
                  </div>
                  {/* <div className="table-data"> ^ </div> */}
                  <div className="table-data score">{standing.teamScore}</div>
                </div>
                <div className="table-row-bottom">
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