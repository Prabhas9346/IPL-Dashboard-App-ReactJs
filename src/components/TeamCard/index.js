import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {team} = props
  const {id, name, teamImageUrl} = team
  return (
    <li className="liEl">
      <Link to={`/team-matches/${id}`}>
        <div className="teamLogoBox">
          <img className="teamLogo" src={teamImageUrl} alt={name} />
          <p className="teamName">{name}</p>
        </div>
      </Link>
    </li>
  )
}
export default TeamCard
