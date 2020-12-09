import React, { useEffect } from 'react';
import Header from './components/page-components/header-component/header-component';
import Footer from './components/page-components/footer-component/footer-component';
import { useImmerReducer } from 'use-immer';
import Home from './pages/home';
import Profile from './pages/profile';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StateContext from './utils/StateContext';
import DispatchContext from './utils/DispatchContext';
import Signup from './pages/signup';
import FlashMessages from './utils/FlashMessage';

const App = () => {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('quizappUsername')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('quizappToken'),
      username: localStorage.getItem('quizappUsername'),
      email: localStorage.getItem('quizappEmail'),
      id: localStorage.getItem('quizappId'),
      avatar: localStorage.getItem('quizappAvatar')
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.user.username = action.value.username;
        draft.user.email = action.value.email;
        draft.user.id = action.value.id;
        draft.loggedIn = true;
        break;
      case 'logout':
        draft.loggedIn = false;
        break;
      case 'flashMessage':
        draft.flashMessages.push(action.value);
        break;
      default:
        console.log('nutin');
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('quizappUsername', state.user.username);
      localStorage.setItem('quizappId', state.user.id);
      localStorage.setItem('quizappEmail', state.user.email);
    } else {
      localStorage.removeItem('quizappUsername');
      localStorage.removeItem('quizappId');
      localStorage.removeItem('quizappEmail');
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/sign-up">
              <Signup />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default App;
