import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../../utils/requests';
import DispatchContext from '../../../utils/DispatchContext';

const LogOutComponent = () => {
  const appDispatch = useContext(DispatchContext);

  const handleClick = async e => {
    e.preventDefault();
    appDispatch({ type: 'logout' });
    appDispatch({ type: 'flashMessage', value: 'Successfully logged out!' });
  };

  return (
    <div className="flex-row my-3 my-md-0">
      <Link className="btn btn-sm btn-success mr-2" to="/create-question">
        Create Question
      </Link>{' '}
      <Link className="btn btn-sm btn-success mr-2" to="/profile">
        Profile
      </Link>{' '}
      <button onClick={handleClick} className="btn btn-sm btn-secondary">
        Sign out
      </button>
    </div>
  );
};

export default LogOutComponent;
