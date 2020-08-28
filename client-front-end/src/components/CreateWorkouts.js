import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import '../App.css'

const herokuUrl = process.env.REACT_APP_API_URL
const url = 'http://localhost:4000'

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeReps = this.onChangeReps.bind(this);
        this.onChangeSets = this.onChangeSets.bind(this);
        this.onChangeDistance = this.onChangeDistance.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          username: '',
          description: '',
          duration: 0,
          reps: 0,
          sets: 0,
          distance: 0,
          date: new Date(),
          users: []
        }
    }

    componentDidMount() {
      axios.get(`${url}/users/` || `${herokuUrl}/users`)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({ 
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
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
    onChangeDescription(e) {
        this.setState({
        description: e.target.value
    });
    }
    onChangeDuration(e) {
        this.setState({
        duration: e.target.value
    });
    }
    onChangeReps(e) {
      this.setState({
        reps: e.target.value
      });
    }
    onChangeSets(e) {
      this.setState({
        sets: e.target.value
      });
    }
    onChangeDistance(e) {
      this.setState({
        distance: e.target.value
      })
    }
    onChangeDate(date) {
        this.setState({
        date: date
    });
    }
    onSubmit(e) {
        e.preventDefault();

        const Workout = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            reps: this.state.reps,
            sets: this.state.sets,
            distance: this.state.distance,
            date: this.state.date,
    };

        axios.post(`${url}/workouts/add`|| `${herokuUrl}/workouts/add`, Workout)
          .then(res => console.log(res.data));
        window.location = '/';
    }

      
  render() {
    return (
      <div>
        <h3 id="header">Create New Workout Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group" id='form-group'> 
            <label>Client: </label>
            <select ref="userInput"
                required
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
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Reps: </label>
            <input 
                type="text" 
                className="form-control id='form-group'"
                value={this.state.reps}
                onChange={this.onChangeReps}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Sets:  </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.sets}
                onChange={this.onChangeSets}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Distance (in miles): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.distance}
                onChange={this.onChangeDistance}
                />
          </div>
          <div className="form-group" id='form-group'>
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group" id='form-group'>
            <input type="submit" value="Create Workout Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}