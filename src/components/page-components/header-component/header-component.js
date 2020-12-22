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
    <header className="header-bar bg-primary mb-3">
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
