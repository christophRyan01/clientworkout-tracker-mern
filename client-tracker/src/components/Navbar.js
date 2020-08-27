import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sun from '../photos/UGymlog.png'
import '../App.css'

export default withOktaAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    this.props.authService.login('/');
  }

  async logout() {
    this.props.authService.logout('/');
  }

  render() {
    if (this.props.authState.isPending) return null;

    const button = this.props.authState.isAuthenticated ?
      <button onClick={this.logout}>Logout</button> :
      <button onClick={this.login}>Login</button>;
    return (
      <nav className="navbar" >
        <Link to="/" className="navbar-brand navbar-left"> <img src={Sun} style={{
          width: 100,
          height: 100
        }} alt='' /></Link>
          <div className="buttons" >
                    <ul className="nav ">
                        <li className="navbar-item mr-2" >
                            <Button type='' size='lg' variant='outline-light'>
                            <Link to="/" className="nav-link" >Exercises</Link>
                            </Button>
                        </li>
                        <li className="navbar-item mr-2 ">
                            <Button type='submit' size='lg' variant='outline-light'>
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                            
                            </Button>
                        </li>
                        <li className="navbar-item mr-2">
                            <Button type='submit' size='lg' variant='outline-light'>
                            <Link to="/user" className="nav-link">Create Client</Link>
                            </Button>
                        </li>
                        <li className="navbar-item mr-2">
                            <Button type='submit' size='lg' variant='outline-light'>
                            <Link to="/profile" className="nav-link">Clients Progress</Link>
                            </Button>
                        </li>
                        {/* <li className="navbar-item mr-2">
                        <Button type='' size='lg' variant='outline-light'>
                        <Link to="/login">Login</Link>
                        </Button>
                        </li> */}
                    </ul>
          </div>
        
      </nav>
    );
  }
})