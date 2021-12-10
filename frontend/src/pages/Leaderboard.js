import axios from "axios";
import { Sword } from "../components/assets/Sword";
import { useState, useEffect } from "react";

export default function Leaderboard() {

  const [standings, setStandings] = useState([])

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/leaderboard/")
      .then(res => {
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
                <div className="table-data rank">{standing.rank}</div>
                <div className="table-data name">
                  <img src={standing.image} className="profile-image" alt="profile"/>
                  {standing.name}
                </div>
                <div className="table-data score">{standing.score}</div>
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