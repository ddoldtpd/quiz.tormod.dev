import React, { useState, useContext } from 'react';
import { getMyQuestions } from '../utils/requests';
import DispatchContext from '../utils/DispatchContext';
import StateContext from '../utils/StateContext';
import Page from './page';

const Profile = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const [questions, setQuestions] = useState([]);

  const handleClick = async () => {
    const resp = await getMyQuestions();
    console.log(resp.data.data);
    setQuestions(resp.data.data);
  };

  return (
    <Page>
      <h2>Profile</h2>
      <div>
        <button onClick={handleClick}>Get questions</button>
        <div>
          {questions.map(el => {
            return <div key={el._id}>{el.title}</div>;
          })}
        </div>
      </div>
    </Page>
  );
};

export default Profile;
