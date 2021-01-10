import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../header-component/header.css';
import StateContext from '../../../utils/StateContext';
import LoginComponent from '../login-component/login-component';
import LogOutComponent from '../logout-component/logout-component';

const Header = () => {
  const appState = useContext(StateContext);

  return (
    <header className="header-bar mb-3 navbar-custom">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            QuizApp
          </Link>
        </h4>
        {appState.loggedIn ? <LogOutComponent /> : <LoginComponent />}
      </div>
    </header>
  );
};

export default Header;
