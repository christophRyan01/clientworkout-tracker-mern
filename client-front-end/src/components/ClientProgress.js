import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iframe from 'react-iframe'
import '../App.css'
import axios from 'axios';

const Client = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.currentweight}</td>
    <td>{props.user.goalweight}</td>
    <td>{props.user.daysperweek}</td>
    <td>{props.user.poundslost}</td>
    <td>{props.user.ontrack}</td>
    <td>
      <Link to={"/edit-client/"+props.user._id}>Edit</Link> |{' '} 
      <a href="/profile" onClick={() => { props.deleteUser(props.user._id) }}>Delete</a>
    </td>
  </tr>
)

export default class ClientProgress extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/users/')
     .then(response => {
       this.setState({ users: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteUser(id) {
    axios.delete('http://localhost:4000/users/'+id)
      .then(res => console.log(res.data));
    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }
  
  clientList() {
    return this.state.users.map(currentclient => {
      return <Client    
      user={currentclient} 
      deleteUser={this.deleteUser} 
      key={currentclient._id}/>;
    })
  }
  render() {
    return (
      <>
        <div id="log">
          <h3>Logged Clients</h3>
          <table className="table">
              <thead className="thead-light">
                  <tr>
                      <th>Client</th>
                      <th>Current Weight (lb's)</th>
                      <th>Goal Weight (lb's)</th>
                      <th>Workouts Per Week</th>
                      <th>Pounds Lost (lb's)</th>
                      <th>On Track</th>
                      <th>Update</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.clientList() }
                  </tbody>
          </table>
      </div>
      <div className="bmi">
          <iframe async title={'BMI'} className="bmi"
          src="https://bmicalculatorusa.com/widgets/widget.php?t=720x300" 
          style={{
            width:720, 
            height:300, 
            frameborder:5}}>
            </iframe>
      </div>
    </>
    )
  }
}