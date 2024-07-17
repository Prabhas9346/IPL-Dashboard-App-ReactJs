import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    latestMatchDetails: {},
    recentMatches: [],
    teamBanner: '',
    isLoading: true,
    teamId: '',
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({teamId: id})
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }
    const {latestMatchDetails, recentMatches, teamBannerUrl} = updatedData
    const latestMatchDetailsUpdated = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }
    const recentMatchesUpdated = recentMatches.map(ele => ({
      competingTeam: ele.competing_team,
      competingTeamLogo: ele.competing_team_logo,
      date: ele.date,
      firstInnings: ele.first_innings,
      id: ele.id,
      manOfTheMatch: ele.man_of_the_match,
      matchStatus: ele.match_status,
      result: ele.result,
      secondInnings: ele.second_innings,
      umpires: ele.umpires,
      venue: ele.venue,
    }))
    console.log(data)
    this.setState({
      teamBanner: teamBannerUrl,
      recentMatches: recentMatchesUpdated,
      latestMatchDetails: latestMatchDetailsUpdated,
      isLoading: false,
    })
  }

  render() {
    const {teamBanner, recentMatches, teamId} = this.state
    const {latestMatchDetails, isLoading} = this.state
    return (
      <div className={`teamMatchesBox ${teamId}`}>
        {!isLoading ? (
          <div className="bannerEl">
            <div className="teamBannerImg">
              <img
                className="teamBannerImg"
                src={teamBanner}
                alt="team banner"
              />
            </div>
            <h1>Latest Matches</h1>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="matchCardList">
              {recentMatches.map(ele => (
                <MatchCard match={ele} key={ele.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
