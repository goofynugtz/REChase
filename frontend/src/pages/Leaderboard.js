import { Sword } from "../components/assets/Sword";

export default function Leaderboard() {
  
  let scores = [
    {
      "rank": 1,
      "name": "Goofy",
      "score": 250 
    },
    {
      "rank": 2,
      "name": "Test1",
      "score": 200
    },
    {
      "rank": 3,
      "name": "Test2",
      "score": 100
    },
    {
      "rank": 4,
      "name": "Test3",
      "score": 50 
    },
    {
      "rank": 5,
      "name": "DK",
      "score": 25 
    },
    {
      "rank": 6,
      "name": "AK",
      "score": 12 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
    {
      "rank": 7,
      "name": "Dave",
      "score": 0 
    },
  ]
  
  
  return (
    <div className="home">
      <div className="main">
        <div className="heading mg-t">Leaderboard</div>
        <div className="table">
          {scores.map((score) => {
            return (
              <div className="table-row">
              <div className="table-data rank">{score.rank}</div>
              <div className="table-data name">{score.name}</div>
              <div className="table-data score">{score.score}</div>
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

// Leaderboard;