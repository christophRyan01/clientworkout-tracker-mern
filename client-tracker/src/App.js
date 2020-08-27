import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import "./App.css"

import Navbar from "./components/Navbar"
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateWorkouts from "./components/CreateWorkouts";
import CreateUser from "./components/CreateClient";
import ClientProgress from "./components/ClientProgress"
import EditClient from './components/EditClient'
import Login from './components/Login'

function onAuthRequired({history}) {
  history.push('/login')
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://dev-769794.okta.com/oauth2/default'
                  clientId='{0oas5sl6aD8Rgwxl44x6}'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  pkce={true}>
          <div className="container-fluid">
            <Navbar />
            <br/>
            <Route path="/" exact={true} component={ ExercisesList } />
            <Route path="/edit/:id" exact={true} component={ EditExercise } />
            <Route path="/create" exact={true} component={ CreateWorkouts } />
            <SecureRoute path="/user" component={ CreateUser } />
            <SecureRoute path='/edit-client/:id' component={ EditClient } />
            <SecureRoute path="/profile" component={ ClientProgress }/>
            <Route path='/login' render={() => <Login issuer='https://https://dev-769794.okta.com/oauth2/default' />} />
            <Route path='/implicit/callback' component={LoginCallback} />
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;