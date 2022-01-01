import { Shield } from "../components/assets/Shield";
import { useEffect } from "react";
import axios from "axios";

export default function Rules () {


  useEffect(() => {
    axios.get("http://localhost:8000/rules/")
    .then (res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  })

  return (
    <div className="home">
      <div className="main">
        <div className="heading mg-t">Rules</div>
        <ul className="rules-list">
          <li>
            There will be several levels with increasing difficulty.
          </li>
          <li>
            A player can only be in one team.
          </li>
          <li>
            One player will create the team and another member can join by entering the team code.
          </li>
          <li>
            Once you join/create a team you cannot leave.
          </li>
          <li>
            Answers can be multiword. You need to gives spaces between them.
          </li>
          <li>
            Answers aren't case-sensitive.
          </li>
          <li>
            You cannot proceed to the next level without completing the current level.
          </li>
          <li>
            Hints will be released as per the number of teams stuck on a particular question.
          </li>
          <li>
            Refresh the page to see hints.
          </li>
          <li>
            Seeing a hint won't cost any penalty.
          </li>
          <li>
            Leaderboard will be decided according to the time taken by teams to complete levels.
          </li>
        </ul>

      </div>
      <div className="svg-parent themed-stroke">
        <Shield />
      </div>
    </div>
  )
}