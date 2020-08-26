import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css"

import Navbar from "./components/Navbar"
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateWorkouts from "./components/CreateWorkouts";
import CreateUser from "./components/CreateClient";
import ClientProgress from "./components/ClientProgress"
import EditClient from './components/EditClient'

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <br/>
        <Route path="/" exact component={ ExercisesList } />
        <Route path="/edit/:id" component={ EditExercise } />
        <Route path="/create" component={ CreateWorkouts } />
        <Route path="/user" component={ CreateUser } />
        <Route path='/edit-client/:id' component={ EditClient } />
        <Route path="/profile" component={ ClientProgress }/>
      </div>
    </Router>
  );
}

export default App;