import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../header-component/header.css';
import DispatchContext from '../../../utils/DispatchContext';
import StateContext from '../../../utils/StateContext';
import LoginComponent from '../login-component/login-component';
import LogOutComponent from '../logout-component/logout-component';

const Header = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  return (
    <div >
      <nav>
        <div className="logo">
          <h4>Quiz-App</h4>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li>
            <Link to="/profile">My page</Link>
          </li>
          <li>
            <Link to="/score">Score</Link>
          </li>
          <li>
            {appState.loggedIn ? <LogOutComponent /> : <LoginComponent />}
          </li>
          {/* <li>
            {appState.loggedIn ? <SignUpComponent /> : <LoginComponent />}
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
