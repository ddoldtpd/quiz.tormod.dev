import axios from 'axios';
// import { catchAsync } from './catchAsync';

axios.defaults.withCredentials = false;
console.log('ENV: ', process.env.REACT_APP_ENV);

if (process.env.REACT_APP_ENV === 'production') {
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
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async id => {
  try {
    const response = await axios.get(`/questions/${id}`);
    return response.data;
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

export const DoesQuestionExist = async title => {
  try {
    const response = await axios.post(
      '/questions/does-question-exist',
      {
        title
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*', //process.env.REACT_APP_BACKENDURL,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const AnswerQuestion = async sendObject => {
  console.log('Answering question:', sendObject);
  try {
    const response = await axios.post(
      `/questions/${sendObject.id}`,
      {
        answer: sendObject.answer
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*', //process.env.REACT_APP_BACKENDURL,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return 'not logged in';
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

export const createQuestion = async (
  title,
  question,
  correctAnswer,
  answerOptions,
  difficulty
) => {
  try {
    console.log(
      'Sending',
      title,
      question,
      correctAnswer,
      answerOptions,
      difficulty
    );

    const response = await axios.post(
      '/questions',
      title,
      question,
      correctAnswer,
      answerOptions,
      difficulty,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*', //process.env.REACT_APP_BACKENDURL,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editQuestion = async sendObject => {
  try {
    const title = sendObject.title;
    const question = sendObject.question;
    const correctAnswer = sendObject.correctAnswer;
    const difficulty = sendObject.difficulty;
    const answerOptions = sendObject.answerOptions;
    console.log(
      'Sending',
      sendObject.id,
      title,
      question,
      correctAnswer,
      answerOptions,
      difficulty
    );

    const response = await axios({
      method: 'PATCH',
      url: `/users/me/questions/${sendObject.id}`,
      data: {
        title,
        question,
        correctAnswer,
        answerOptions,
        difficulty
      },
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });

    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async id => {
  try {
    console.log('Deleting', id);

    const response = await axios({
      method: 'DELETE',
      url: `/users/me/questions/${id}`,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });

    console.log('response:', response);
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
          'Access-Control-Allow-Origin': '*',
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

export const getMe = async () => {
  let response;
  try {
    response = await axios.get('/users/me', {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });

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
