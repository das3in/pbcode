import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
      team: '' 
    }

    this.onChange = this.onChange.bind(this);
    this.submitPlayer = this.submitPlayer.bind(this);
  }

  submitPlayer(data) {
    let teamName = this.state.team;
    let player = {
      name: this.state.name,
      number: this.state.number,
      teams: {
        [this.state.team]: true
      }
    }


    this.props.teams.addPlayer(player);
    this.setState({
      name: '',
      number: '',
    })
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    const {name, number, team} = this.state;
    const { teams } = this.props.teams;
    return (
      <div className="container">
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" value={this.state.name} type="text" name="name" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label>Number</label>
          <input type="number" value={this.state.number} className="form-control" name="number" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label>Team</label>
          <select onChange={this.onChange} name="team" className="form-control">
            <option>Select Team</option>
            {Object.keys(teams).map((team) =>
              <option key={team} value={team} name={teams[team].name}>{teams[team].name}</option>
            )}
          </select>
        </div>
        <button className="btn btn-primary" onClick={this.submitPlayer}>Add Player</button>
      </div>
    )
  }
}

export default Setup;
