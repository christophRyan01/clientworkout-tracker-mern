import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sun from '../photos/Gymlogo.jpg'
import '../App.css'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" >
        <Link to="/" className="navbar-brand navbar-left"> <img src={Sun} style={{
          width: 100,
          height:100
        }} alt='' /></Link>
          <div className="buttons" >
                    <ul className="nav ">
                        <li className="navbar-item mr-2" >
                            <Button type='' size='lg' variant='outline-light'>
                            <Link to="/" className="nav-link" >Exercises</Link>
                            </Button>
                        </li>
                        <li className="navbar-item mr-2 custom">
                            <Button type='submit' size='lg' variant='outline-primary'>
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                            </Button>
                        </li>
                        <li className="navbar-item mr-2">
                            <Button type='submit' size='lg' variant='outline-primary'>
                            <Link to="/user" className="nav-link">Create Client</Link>
                            </Button>
                        </li>
                        <li className="navbar-item mr-2">
                            <Button type='submit' size='lg' variant='outline-primary'>
                            <Link to="/profile" className="nav-link">Clients Progress</Link>
                            </Button>
                        </li>
                    </ul>
          </div>
        
      </nav>
    );
  }
}