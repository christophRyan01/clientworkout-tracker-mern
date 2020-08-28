import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'

const herokuUrl = process.env.REACT_APP_API_URL
const url = 'http://localhost:4000'

export default class CreateClient extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCurrentWeight = this.onChangeCurrentWeight.bind(this);
    this.onChangeGoalWeight = this.onChangeGoalWeight.bind(this);
    this.onChangeDaysPerWeek = this.onChangeDaysPerWeek.bind(this);
    this.onChangePoundsLost = this.onChangePoundsLost.bind(this);
    this.onChangeOnTrack = this.onChangeOnTrack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      currentweight: 0,
      goalweight: 0,
      daysperweek: 0,
      poundslost: 0,
      ontrack: '',
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeCurrentWeight(e) {
    this.setState({
      currentweight: e.target.value
    });
  }

  onChangeGoalWeight(e) {
    this.setState({
      goalweight: e.target.value
    })
  }

  onChangeDaysPerWeek(e) {
    this.setState({
      daysperweek: e.target.value
    })
  }

  onChangePoundsLost(e) {
    this.setState({
      poundslost: e.target.value
    })
  }

  onChangeOnTrack(e) {
    this.setState({
      ontrack: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

  const client = {
    username: this.state.username,
    currentweight: this.state.currentweight,
    goalweight: this.state.goalweight,
    daysperweek: this.state.daysperweek,
    poundslost: this.state.poundslost,
    ontrack: this.state.ontrack,
  }

  axios.post(`${url}/users/create-client` || `${herokuUrl}/users/create-client`, client)
    .then(res => console.log(res.data));

  this.setState({ 
    username: '',
    currentweight: 0,
    goalweight: 0,
    daysperweek: 0,
    poundslost: 0,
    ontrack: '', })
  }

  render() {
    return (
      <div>
        <h3 id="header">Create Client</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group" id='form-group'> 
            <label>Client Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Current Weight: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.currentweight}
                onChange={this.onChangeCurrentWeight}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Goal Weight: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.goalweight}
                onChange={this.onChangeGoalWeight}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Days Per Week: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.daysperweek}
                onChange={this.onChangeDaysPerWeek}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Pounds Lost: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.poundslost}
                onChange={this.onChangePoundsLost}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>On Track: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.ontrack}
                onChange={this.onChangeOnTrack}
                />
          </div>
          <div className="form-group" id='form-group'>
            <input type="submit" value="Create Client" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}