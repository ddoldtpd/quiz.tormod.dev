import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../../utils/requests';
import DispatchContext from '../../../utils/DispatchContext';

const LogOutComponent = () => {
  const appDispatch = useContext(DispatchContext);

  const handleClick = async e => {
    e.preventDefault();
    appDispatch({ type: 'logout' });
  };

  return (
    <div>
      <button onClick={handleClick}>Log out</button>
      <Link className="" to="/profile">
        Profile
      </Link>
    </div>
  );
};

export default LogOutComponent;
