import ProfileQuestion from '../components/page-components/profileQuestion-component/profileQuestion';
import { NavLink, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { getMe } from '../utils/requests';
import StateContext from '../utils/StateContext';
import Page from './page';
import ProfileAnswer from '../components/page-components/profileAnswer-component/profileAnswer';
import LoadingDotsIcon from '../components/loadingdots-component/LoadingDotsIcon';

const Profile = () => {
  const appState = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userScore, setuserScore] = useState(NaN);

  useEffect(() => {
    const getme = async () => {
      const response = await getMe();
      if (response.status === 'success') {
        const info = response.data.data;
        setuserScore(info.userScore.score);
      } else {
        console.log('no info for this user');
        setuserScore(0);
      }
      setIsLoading(false);
    };
    getme();
  }, []);

  return (
    <Page title="Profile Screen">
      <div className="row d-flex align-items-center">
        <h2>{appState.user.username}</h2>&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <div>Score: {userScore === NaN }</div> */}
        <div>Score:</div>&nbsp;
        <div>{isLoading && <LoadingDotsIcon />}</div>
        <div>{!isLoading && userScore}</div>
      </div>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <NavLink exact to="/profile" className="nav-item nav-link">
          My Questions: {/* {state.profileData.counts.postCount} */}
        </NavLink>
        <NavLink to="/profile/answered-questions" className="nav-item nav-link">
          Answered Questions: {/* state.profileData.counts.followerCount */}
        </NavLink>
      </div>

      <Switch>
        <Route exact path="/profile">
          <ProfileQuestion />
        </Route>
        <Route path="/profile/answered-questions">
          <ProfileAnswer />
        </Route>
      </Switch>
    </Page>
  );
};

export default Profile;
