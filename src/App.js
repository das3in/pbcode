import React, { Component } from 'react';
import Tool from './Tool';
import Setup from './Setup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMatch: false,
      team1: '',
      team2: '',
      matchId: '',
      points: []
    }

    this.submitMatch = this.submitMatch.bind(this);
    this.addPointToMatch = this.addPointToMatch.bind(this);
    this.postMatchToServer = this.postMatchToServer.bind(this);
  }

  submitMatch(match) {
    this.setState({
      activeMatch: true,
      team1: match.team1,
      team2: match.team2,
      matchId: match.matchId
    })
  }

  addPointToMatch(point) {
    let newArr = this.state.points;
    newArr.push(point);
    this.setState({points: newArr});
  }

  postMatchToServer() {
    const newMatch = {
      matchId: this.state.matchId,
      team1: this.state.team1,
      team2: this.state.team2,
      points: this.state.points
    }

    this.props.addMatch(newMatch);
  }
  render() {
    const { team1, team2 } = this.state;
    const teams = this.props;
    return (
      <div>
        {this.state.activeMatch ?
            <Tool
              team1={teams.teams[team1]}
              team2={teams.teams[team2]}
              addPointToMatch={this.addPointToMatch}
              postMatchToServer={this.postMatchToServer}/>
            : 
            <Setup teams={teams} submitMatch={this.submitMatch} />
        }
      </div>
    )
  }
}
export default App;
