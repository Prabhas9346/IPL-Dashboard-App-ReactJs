import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getTeamDetails()
  }

  getTeamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data

    const updatedTeams = teams.map(ele => ({
      id: ele.id,
      name: ele.name,
      teamImageUrl: ele.team_image_url,
    }))
    console.log(updatedTeams)
    this.setState({teamsData: updatedTeams, isLoading: false})
  }

  render() {
    const {isLoading, teamsData} = this.state
    return isLoading ? (
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div>
        <div className="logoBox">
          <img
            className="iplLogo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="iplLogotxt">IPL Dashboard</h1>
        </div>
        <ul className="ulEl">
          {teamsData.map(ele => (
            
              <TeamCard team={ele} key={ele.id} />
            
          ))}
        </ul>
      </div>
    )
  }
}
export default Home
