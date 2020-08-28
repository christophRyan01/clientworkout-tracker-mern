import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'

const herokuUrl = 'process.env.REACT_APP_API_URL'

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
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/users/'+this.props.match.params.id || `${herokuUrl}/users/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          currentweight: response.data.currentweight,
          goalweight: response.data.goalweight,
          daysperweek: response.data.daysperweek,
          poundslost: response.data.poundslost,
          ontrack: response.data.ontrack,
          
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('http://localhost:4000/users/' || `${herokuUrl}/users/`)
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });        
      })
      .catch((error) => {
        console.log(error);
      })
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

    const Client = {
      username: this.state.username,
      currentweight: this.state.currentweight,
      goalweight: this.state.goalweight,
      daysperweek: this.state.daysperweek,
      poundslost: this.state.poundslost,
      ontrack: this.state.ontrack,
    }

    axios.post('http://localhost:4000/users/update/'+this.props.match.params.id || `${herokuUrl}/users/update/`+this.props.match.params.id, Client)
      .then(res => console.log(res.data));

    window.location = '/profile';

    this.setState({ 
      username: '',
       })
  }

  render() {
    return (
      <div>
        <h3 id="header" >Edit Client</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group" id='form-group'> 
            <label>Client Name: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
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
            <input type="submit" value="Update Client" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}