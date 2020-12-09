import { DoesEmailExist, DoesUsernameExist, signUp } from '../utils/requests';
import DispatchContext from '../utils/DispatchContext';
import { CSSTransition } from 'react-transition-group';
import React, { useEffect, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import Page from './page';

function Signup() {
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    username: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: false,
      checkCount: 0
    },
    email: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: '',
      hasErrors: false,
      message: ''
    },
    passwordConfirm: {
      value: '',
      hasErrors: false,
      message: ''
    },
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'usernameImmediately':
        draft.username.hasErrors = false;
        draft.username.value = action.value;
        if (draft.username.value.length > 30) {
          draft.username.hasErrors = true;
          draft.username.message = 'Username to long';
        }
        if (
          draft.username.value &&
          !/^([a-zA-Z0-9]+)$/.test(draft.username.value)
        ) {
          draft.username.hasErrors = true;
          draft.username.message =
            'Username can only contain letters and numbers';
        }
        break;
      case 'usernameAfterDelay':
        if (draft.username.value.length < 3) {
          draft.username.hasErrors = true;
          draft.username.message = 'needs more than 3 chars';
        }
        if (!draft.hasErrors && !action.noRequest) {
          draft.username.checkCount++;
        }
        break;
      case 'usernameUniqueResults':
        if (action.value) {
          draft.username.hasErrors = true;
          draft.username.isUnique = false;
          draft.username.message = 'user exist';
        } else {
          draft.username.isUnique = true;
        }
        break;
      case 'emailImmediately':
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        break;
      case 'emailAfterDelay':
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = 'Invalid email';
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++;
        }
        break;
      case 'emailUniqueResults':
        if (action.value) {
          draft.email.hasErrors = true;
          draft.email.isUnique = false;
          draft.email.message = 'Email is already in use';
        } else {
          draft.email.isUnique = true;
        }
        break;
      case 'passwordImmediately':
        draft.password.hasErrors = false;
        draft.password.value = action.value;
        if (draft.password.value.length > 12) {
          draft.password.hasErrors = true;
          draft.password.message = 'Password to long';
        }
        break;
      case 'passwordAfterDelay':
        if (draft.password.value.length < 6) {
          draft.password.hasErrors = true;
          draft.password.message = 'password to short';
        }
        break;
      case 'passwordConfirmImmediately':
        draft.passwordConfirm.hasErrors = false;
        draft.passwordConfirm.value = action.value;
        if (draft.passwordConfirm.value.length > 12) {
          draft.passwordConfirm.hasErrors = true;
          draft.passwordConfirm.message = 'Password to long';
        }
        break;
      case 'passwordConfirmAfterDelay':
        if (draft.passwordConfirm.value.length < 6) {
          draft.passwordConfirm.hasErrors = true;
          draft.passwordConfirm.message = 'password to short';
        } else if (draft.passwordConfirm.value != draft.password.value) {
          draft.passwordConfirm.hasErrors = true;
          draft.passwordConfirm.message = 'passwords do not match!';
        }
        break;
      case 'submitForm':
        if (
          !draft.username.hasErrors &&
          draft.username.isUnique &&
          !draft.email.hasErrors &&
          draft.email.isUnique &&
          !draft.password.hasErrors &&
          !draft.passwordConfirm.hasErrors
        ) {
          draft.submitCount++;
        }
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(
        () => dispatch({ type: 'usernameAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.username.value]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(
        () => dispatch({ type: 'emailAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(
        () => dispatch({ type: 'passwordAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.password.value]);

  useEffect(() => {
    if (state.passwordConfirm.value) {
      const delay = setTimeout(
        () => dispatch({ type: 'passwordConfirmAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.passwordConfirm.value]);

  useEffect(() => {
    if (state.username.checkCount) {
      // Send requests here
      const usernameExist = async () => {
        const response = await DoesUsernameExist(state.username.value);
        console.log('hello');
        dispatch({
          type: 'usernameUniqueResults',
          value: response.data.message != 'OK'
        });
      };
      usernameExist();
      return;
    }
  }, [state.username.checkCount]);

  useEffect(() => {
    if (state.email.checkCount) {
      // Send requests here
      const emailExist = async () => {
        const response = await DoesEmailExist(state.email.value);
        dispatch({
          type: 'emailUniqueResults',
          value: response.data.message != 'OK'
        });
      };
      emailExist();
      return;
    }
  }, [state.email.checkCount]);

  useEffect(() => {
    if (state.submitCount) {
      const signup = async () => {
        const response = await signUp({
          name: state.username.value,
          email: state.email.value,
          password: state.password.value,
          passwordConfirm: state.passwordConfirm.value
        });
        console.log('Response', response);
        console.log('Response', response.data.user.name);
        console.log('Response', response.data.user.email);
        console.log('Response', response.data.user._id);

        // appDispatch({ type: '', value: '' });
        if (response.status == 'success') {
          appDispatch({
            type: 'login',
            value: {
              username: response.data.user.name,
              email: response.data.user.email,
              id: response.data.user._id
            }
          });

          // active: true
          // email: "real@test.com"
          // name: "real"
          // role: "public"
          // userScore:
          // answeredQuestions: []
          // score: 0
          // __proto__: Object
          // __v: 0
          // _id: "5fadc4f94b7fa30011a5b67c"

          appDispatch({
            type: 'flashMessage',
            value: 'Welcome to your new account!'
          });
        }
      };
      signup();
      return;
    }
  }, [state.submitCount]);
  // useEffect(() => {
  //   if (state.submitCount) {
  //     // Send requests here
  //     const ourRequest = Axios.CancelToken.source();
  //     async function fetchResults() {
  //       try {
  //         const response = await Axios.post(
  //           '/register',
  //           {
  //             username: state.username.value,
  //             email: state.email.value,
  //             password: state.password.value
  //           },
  //           { cancelToken: ourRequest.token }
  //         );
  //         appDispatch({ type: 'login', data: response.data });
  //         appDispatch({
  //           type: 'flashMessage',
  //           value: 'Welcome to your new account!'
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     fetchResults();
  //     return () => ourRequest.cancel();
  //   }
  // }, [state.submitCount]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'usernameImmediately', value: state.username.value });
    dispatch({
      type: 'usernameAfterDelay',
      value: state.username.value,
      noRequest: true
    });
    dispatch({ type: 'emailImmediately', value: state.email.value });
    dispatch({
      type: 'emailAfterDelay',
      value: state.email.value,
      noRequest: true
    });
    dispatch({ type: 'passwordImmediately', value: state.password.value });
    dispatch({ type: 'passwordAfterDelay', value: state.password.value });
    dispatch({
      type: 'passwordConfirmImmediately',
      value: state.passwordConfirm.value
    });
    dispatch({
      type: 'passwordConfirmAfterDelay',
      value: state.passwordConfirm.value
    });
    dispatch({ type: 'submitForm' });
  }

  return (
    <Page title="Sign up" wide={false}>
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h2>Sign up!</h2>
          <p className="lead text-muted">
            Create a user to create questions on your own and keep track of your
            score!
          </p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input
                onChange={e =>
                  dispatch({
                    type: 'usernameImmediately',
                    value: e.target.value
                  })
                }
                id="username-register"
                name="username"
                className="form-control"
                type="text"
                placeholder="Pick a username"
                autoComplete="off"
              />
              <CSSTransition
                in={state.username.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div className="alert alert-danger small liveValidateMessage">
                  {state.username.message}
                </div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input
                onChange={e =>
                  dispatch({ type: 'emailImmediately', value: e.target.value })
                }
                id="email-register"
                name="email"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
              />
              <CSSTransition
                in={state.email.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div className="alert alert-danger small liveValidateMessage">
                  {state.email.message}
                </div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input
                onChange={e =>
                  dispatch({
                    type: 'passwordImmediately',
                    value: e.target.value
                  })
                }
                id="password-register"
                name="password"
                className="form-control"
                type="password"
                placeholder="Create a password"
              />
              <CSSTransition
                in={state.password.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div className="alert alert-danger small liveValidateMessage">
                  {state.password.message}
                </div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label
                htmlFor="password-register-confirm"
                className="text-muted mb-1"
              >
                <small>Password Confirm</small>
              </label>
              <input
                onChange={e =>
                  dispatch({
                    type: 'passwordConfirmImmediately',
                    value: e.target.value
                  })
                }
                id="password-register-confirm"
                name="password"
                className="form-control"
                type="password"
                placeholder="Confirm password"
              />
              <CSSTransition
                in={state.passwordConfirm.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div className="alert alert-danger small liveValidateMessage">
                  {state.passwordConfirm.message}
                </div>
              </CSSTransition>
            </div>
            <button
              type="submit"
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Sign up for QuizApp
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default Signup;
