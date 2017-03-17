import React, { Component } from 'react';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team1: '',
      team2: '',
      matchId: ''
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmitMatch = this.handleSubmitMatch.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  handleSubmitMatch(){
    this.props.submitMatch(this.state);
    this.setState({
      team1: '',
      team2: '',
      matchId: ''
    })
  }

  render() {
    const { matchId } = this.state;
    const { teams } = this.props.teams;
    return (
      <div className="container" style={{paddingTop: '40px'}}> 
        <div className="jumbotron">
          <h2>Setup Match</h2>
        </div>
        <div className="form-group">
          <label>Team 1</label>
          <select onChange={this.onChange} name="team1" className="form-control">
            <option>Select Team 1</option>
            {Object.keys(teams).map((team) =>
              <option key={team} value={team} name={teams[team].name}>{teams[team].name}</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Team 2</label>
          <select onChange={this.onChange} name="team2" className="form-control">
            <option>Select Team 2</option>
            {Object.keys(teams).map((team) =>
              <option key={team} value={team} name={teams[team].name}>{teams[team].name}</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Match Id</label>
          <input type="text" name="matchId" onChange={this.onChange} className="form-control" value={matchId} />
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={this.handleSubmitMatch}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Setup;

