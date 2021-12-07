import { Map } from "../components/assets/Map";
import { Link } from "react-router-dom";

export default function Dashboard({name, darkMode}) {
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
            <span className="accent big">2</span>
          </div>
          <div className="time-played">
            Time Played <span className="accent big">2</span> hrs <span className="accent big">17</span> mins
          </div>
        </div>
        <div className="big-button">
          <Link to="/hunt/level0" >
            <button>Continue</button>
          </Link>
        </div>
      </div>
      <div className="svg-parent">
        <Map darkMode={darkMode}/>
      </div>
    </section>
  )
}
