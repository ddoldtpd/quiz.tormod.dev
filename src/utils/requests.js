import axios from 'axios';
// import { catchAsync } from './catchAsync';

axios.defaults.withCredentials = true;

if (process.env.REACT_APP_ENV == 'production') {
  axios.defaults.baseURL =
    process.env.REACT_APP_BACKENDURL + process.env.REACT_APP_URLEXTENSION || '';
} else {
  axios.defaults.baseURL =
    process.env.REACT_APP_BACKENDURL_DEV +
      process.env.REACT_APP_URLEXTENSION_DEV || '';
}

export const getQuestions = async () => {
  try {
    const response = await axios.get('/questions');
    return response.data;
    // return response.
  } catch (error) {
    console.log(error);
  }
};

export const DoesEmailExist = async email => {
  try {
    const response = await axios.get(`/users/does-email-exist/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DoesUsernameExist = async username => {
  try {
    const response = await axios.get(`/users/does-username-exist/${username}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyQuestions = async () => {
  try {
    const response = await axios.get('/users/me/questions', {
      withCredentials: true,
      'Content-Type': 'application/json'
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    console.log('signup');
    const response = await axios.post(
      '/users/signup',
      name,
      email,
      password,
      passwordConfirm
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password) => {
  let response;
  try {
    response = await axios.post(
      '/users/login',
      {
        email,
        password
      },
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': process.env.REACT_APP_BACKENDURL,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log('API not responding');
    console.log(error);
    return { status: 'failed' };
  }
};

export const getRandomQuestion = async () => {
  let response;
  try {
    response = await axios.get('/questions/random');
    return response.data;
    // return response.
  } catch (error) {
    console.log('API not responding');
    console.log(error);
    return { status: 'failed' };
  }
};

export const answerQuestion = async (answer, Id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const bodyParameters = {
    answer
  };
  let response;
  try {
    response = await axios.post(`/questions/${Id}`, bodyParameters, config);
    return response.data;
    // return response.
  } catch (error) {
    console.log('API not responding');
    console.log(error);
    return { status: 'failed' };
  }
};
