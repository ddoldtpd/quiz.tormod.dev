import { useParams, NavLink, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
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

  useEffect(() => {
    const getQuestions = async () => {
      const response = await getMyQuestions();
      if (response) {
        const questions = response.data.data;
        console.log('Questions', questions);
        questions.forEach(el => {
          setQuestions(questions.concat(el));
        });
      } else {
        console.log('no questions for this user');
      }
    };
    getQuestions();
  }, []);

  return (
    <Page title="Profile Screen">
      <h2>{appState.user.username}</h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <NavLink exact to="#" className="nav-item nav-link">
          Questions: {/* {state.profileData.counts.postCount} */}
        </NavLink>
        <NavLink to="#" className="nav-item nav-link">
          Answered Questions: {/* state.profileData.counts.followerCount */}
        </NavLink>
      </div>

      <Switch>
        <Route exact path="/profile/:username">
          {/* <ProfilePosts /> */}
        </Route>
        <Route path="/profile/:username/followers">
          {/* <ProfileFollowers /> */}
        </Route>
        <Route path="/profile/:username/following">
          {/* <ProfileFollowing /> */}
        </Route>
      </Switch>
    </Page>
  );
};

export default Profile;
