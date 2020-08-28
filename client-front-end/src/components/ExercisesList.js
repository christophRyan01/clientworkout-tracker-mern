import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iframe from 'react-iframe'
import axios from 'axios';
import '../App.css'

const herokuUrl = 'process.env.REACT_APP_API_URL'
const url = 'http://localhost:4000'


const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.reps}</td>
    <td>{props.exercise.sets}</td>
    <td>{props.exercise.distance}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id || `${herokuUrl}/edit/`+props.exercise._id}>Edit</Link> |{' '} 
      <a href="/" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get(`${url}/workouts/` || `${herokuUrl}/workouts/` )
     .then(response => {
       this.setState({ exercises: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteExercise(id) {
    axios.delete(`${url}/workouts/`+id || `${herokuUrl}/workouts/`+id)
      .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
  
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise 
      exercise={currentexercise} 
      deleteExercise={this.deleteExercise} 
      key={currentexercise._id}/>;
    })
  }
  render() {
    return (
      <>
      <div id="log">
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Client</th>
              <th>Workout</th>
              <th>Workout Duration (min)</th>
              <th>Reps</th>
              <th>Sets</th>
              <th>Distance (miles)</th>
              <th>Date</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>


      <iframe async title="Calorie Counter" 
        src="https://www.mealpro.net/calorie/?color=232323"  
        style={{
          maxwidth: 500,
          frameborder: 0, 
          width: '100%' , 
          height: '500px',
        }}> Calorie Couter </iframe>         
      </>
    )
  }
}