import './index.css'

const MatchCard = props => {
  const {match} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = match
  const matchClass = matchStatus == 'Won' ? 'textColorG' : 'textColorR'
  return (
    <li>
      <div className="matchCardEl">
        <img
          className="image1"
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
        />
        <p>{competingTeam}</p>
        <p>{result}</p>
        <p className={matchClass}>{matchStatus}</p>
      </div>
    </li>
  )
}
export default MatchCard
