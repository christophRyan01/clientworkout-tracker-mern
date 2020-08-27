import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {useAuth0} from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sun from '../photos/UGymlog.png'
import '../App.css'


const Navbar = () => {

  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  const {
    
    logout,
  } = useAuth0();
   
  
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

                        {isAuthenticated ? <li className="navbar-item mr-2">
                            <Button type='submit' size='lg' variant='outline-light'>
                            <Link to="/user" className="nav-link">Create Client</Link>
                            </Button>
                        </li> : ''}
                        
                        {isAuthenticated ? <li className="navbar-item mr-2">
                            <Button type='submit' size='lg' variant='outline-light'>
                            <Link to="/profile" className="nav-link">Clients Progress</Link>
                            </Button>
                        </li> : ''}

                        <li className="navbar-item mr-2" >
                        { !isAuthenticated ? (<Button type='submit' size='lg' variant='outline-light'
                        onClick={() => loginWithRedirect()}>Log In
                        </Button>) : (<Button type='submit' size='lg' variant='outline-light'
                        onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                        </Button> )}
                        </li>

                    </ul>
          </div>
        
      </nav>
    );
  
}

export default Navbar;