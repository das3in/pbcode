import React, { Component } from 'react';
import Timer from './Timer';

class Tool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: null,
      activeTeam: null,
      action: null,
      winner: '',
      result: null,
      optional: null,
      secondsRemaining: 0,
      startingSeconds: 960,
      timerActive: false,
      team1DataPoints: [],
      team2DataPoints: []
    }

    this.selectPlayer = this.selectPlayer.bind(this);
    this.selectPrimary = this.selectPrimary.bind(this);
    this.selectOptional = this.selectOptional.bind(this);
    this.selectResult = this.selectResult.bind(this);
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.submitPoint = this.submitPoint.bind(this);
    this.submitFullPoint = this.submitFullPoint.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({secondsRemaining: this.state.startingSeconds})
  }

  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if(this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  }

  submitPoint(){
    const point = {
      player: this.state.activePlayer,
      action: this.state.action,
      result: this.state.result,
      optional: this.state.optional,
      secondsRemaining: this.state.secondsRemaining
    };

    if(this.state.activeTeam === this.props.team1.name) {
      let newData = this.state.team1DataPoints;
      newData.push(point);
      this.setState({team1DataPoints: newData})
    } else if (this.state.activeTeam === this.props.team2.name) {
      let newData = this.state.team2DataPoints;
      newData.push(point);
      this.setState({team2DataPoints: newData})
    }

    this.setState({
      activePlayer: null,
      action: null,
      result: null,
      optional: null
    })
  }

  submitFullPoint() {

    let point = {
      team1: this.state.team1DataPoints,
      team2: this.state.team2DataPoints,
      winner: this.state.winner
    }
    this.props.addPointToMatch(point);
    this.setState({team1DataPoints: [], team2DataPoints: [], winner: ''});
  }

  startTimer() {
    this.setState({timerActive: true});
    this.interval = setInterval(this.tick, 1000);
  }

  stopTimer() {
    this.setState({timerActive: false});
    clearInterval(this.interval);
  }

  selectPlayer(e) {
    e.preventDefault();
    this.setState({activePlayer : e.target.name, activeTeam : e.target.id});
  }

  selectPrimary(e) {
    e.preventDefault();
    this.setState({action : e.target.name});
  }

  selectOptional(e){
    e.preventDefault();
    this.setState({optional : e.target.name});
  }

  selectResult(e) {
    e.preventDefault();
    this.setState({result : e.target.name});
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value})
  }
  render() {
    const team1 = this.props.team1;
    const team2 = this.props.team2;
    return (
      <div className="container">
        <h1 className="text-center">Paintball Playbook</h1>
        <div className="jumbotron">
          <Timer
            secondsRemaining={this.state.secondsRemaining}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            timerActive={this.state.timerActive}
          />
          <div className="Text-center">
            <button className="btn btn-lg btn-default" onClick={this.submitFullPoint}>Submit Point</button>
            <button className="btn btn-lg btn-default" onClick={this.props.postMatchToServer}>Submit Match</button>
            <h3>Winner</h3>
            <select onChange={this.onChange} name="winner" className="form-control">
              <option>Winner</option>
              <option value={team1.name}>{team1.name}</option>
              <option value={team2.name}>{team2.name}</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <h4 className="text-center">{team1.name}</h4>
            <div className="list-group">
              {Object.keys(team1.players).map((player) =>
                <a href="#"
                  key={player}
                  id={team1.name}
                  onClick={this.selectPlayer}
                  className={"list-group-item " + (this.state.activePlayer === player ? 'active' : '')}
                  name={player}>
                  {team1.players[player].name} - {team1.players[player].number ? team1.players[player].number : '' }
                </a>
              )}
            </div>
          </div>
          <div className="col-md-2">
            <h4 className="text-center">{team2.name}</h4>
            <div className="list-group">
              {Object.keys(team2.players).map((player) =>
                <a href="#"
                  key={player}
                  onClick={this.selectPlayer}
                  id={team2.name}
                  className={"list-group-item " + (this.state.activePlayer === player ? 'active' : '')}
                  name={player}>
                  {team2.players[player].name} - {team2.players[player].number ? team2.players[player].number : '' }
                </a>
              )}
            </div>
          </div>
          <div className="col-md-2">
            <h4 className="text-center">Primary</h4>
            <div className="list-group">
              <a href="#" name="bc" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'bc' ? 'active' : '')}>Back Center</a>
              <a href="#" name="st" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'st' ? 'active' : '')}>Snake Tower</a>
              <a href="#" name="god" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'god' ? 'active' : '')}>God</a>
              <a href="#" name="s1" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 's1' ? 'active' : '')}>Snake 1</a>
              <a href="#" name="sc" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'sc' ? 'active' : '')}>Snake corner</a>
              <a href="#" name="dcan" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'dcan' ? 'active' : '')}>Dorito Can</a>
              <a href="#" name="d1" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'd1' ? 'active' : '')}>Dorito 1</a>
              <a href="#" name="dc" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'dc' ? 'active' : '')}>Dorito Corner</a>
              <a href="#" name="mt" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'mt' ? 'active' : '')}>Mid Tower</a>
              <a href="#" name="mc" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'mc' ? 'active' : '')}>Mid Can</a>
              <a href="#" name="dw" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'dw' ? 'active' : '')}>D-Wall</a>
              <a href="#" name="sw" onClick={this.selectPrimary}
                className={"list-group-item " + (this.state.action === 'sw' ? 'active' : '')}>S-Wall</a>
            </div>
          </div>
          <div className="col-md-2">
            <h4 className="text-center">Conditional</h4>
            <div className="list-group">
              <a href="#" name="run" onClick={this.selectOptional}
                className={"list-group-item " + (this.state.optional === 'run' ? 'active' : '')}>Running</a>
              <a href="#" name="rs" onClick={this.selectOptional}
                className={"list-group-item " + (this.state.optional === 'rs' ? 'active' : '')}>Run+Shoot</a>
              <a href="#" name="shoot" onClick={this.selectOptional}
                className={"list-group-item " + (this.state.optional === 'shoot' ? 'active' : '')}>Shoot</a>
              <a href="#" name="sd" onClick={this.selectOptional}
                className={"list-group-item " + (this.state.optional === 'sd' ? 'active' : '')}>Shoot+delay</a>
            </div>
          </div>
          <div className="col-md-2">
            <h4 className="text-center">Result</h4>
            <div className="list-group">
              <a href="#" name="live" onClick={this.selectResult}
                className={"list-group-item " + (this.state.result === 'live' ? 'active' : '')}>Live</a>
              <a href="#" name="die" onClick={this.selectResult}
                className={"list-group-item " + (this.state.result === 'die' ? 'active' : '')}>Die</a>
              <a href="#" name="minp" onClick={this.selectResult}
                className={"list-group-item " + (this.state.result === 'minp' ? 'active' : '')}>Minor Penalty</a>
              <a href="#" name="majp" onClick={this.selectResult}
                className={"list-group-item " + (this.state.result === 'majp' ? 'active' : '')}>Major Penalty</a>
              <a href="#" name="ponp" onClick={this.selectResult}
                className={"list-group-item " + (this.state.result === 'ponp' ? 'active' : '')}>Pulled on Penalty</a>
            </div>
          </div>
          <div className="col-md-2">
            <h4 className="text-center">Complete?</h4>
            <button className="btn btn-success text-center" onClick={this.submitPoint}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Tool;
