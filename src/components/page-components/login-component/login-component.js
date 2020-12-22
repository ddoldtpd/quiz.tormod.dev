import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../../utils/requests';
import DispatchContext from '../../../utils/DispatchContext';
import StateContext from '../../../utils/StateContext';

const LoginComponent = props => {
  const appDispatch = useContext(DispatchContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await login(username, password);
    if (response.status === 'success') {
      appDispatch({
        type: 'login',
        value: {
          username: response.data.user.name,
          email: response.data.user.email,
          id: response.data.user._id
        }
      });
      appDispatch({ type: 'flashMessage', value: 'Successfully logged out!' });
      console.log('logged in');
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
            name="Username"
            value={username}
            className="form-control form-control-sm input-dark"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="form-control form-control-sm input-dark"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto mr-0 pr-md-0 mb-3 mb-md-0">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
        <div className="col-md-auto">
          <Link className="btn btn-success btn-sm" to="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
    // <Link className="" to="/sign-up">
    //   Sign up
    // </Link>
  );
};

export default LoginComponent;

// <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
//   <div className="row align-items-center">
//     <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
//       <input
//         onChange={e => setUsername(e.target.value)}
//         name="username"
//         className="form-control form-control-sm input-dark"
//         type="text"
//         placeholder="Username"
//         autoComplete="off"
//       />
//     </div>
//     <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
//       <input
//         onChange={e => setPassword(e.target.value)}
//         name="password"
//         className="form-control form-control-sm input-dark"
//         type="password"
//         placeholder="Password"
//       />
//     </div>
//     <div className="col-md-auto">
//       <button className="btn btn-success btn-sm">Sign In</button>
//     </div>
//   </div>
// </form>;

// Fail
// {
//   "status": "fail"
// }

// On success
// {
//   "status": "success",
//   "token": {},
//   "data": {
//       "user": {
//           "userScore": {
//               "score": 0,
//               "answeredQuestions": []
//           },
//           "role": "public",
//           "_id": "5f36718b971e9f002996f837",
//           "name": "kerstin",
//           "email": "kerstin@elvegaard.com",
//           "__v": 0
//       }
//   }
// }
