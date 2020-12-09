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
      console.log('logged in');
    } else {
    }
  };

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
            name="Username"
            value={username}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <input type="submit" onClick={handleSubmit}></input>
      </form>
      <Link className="" to="/sign-up">
        Sign up
      </Link>
    </div>
  );
};

export default LoginComponent;

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
