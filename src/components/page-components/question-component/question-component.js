import React, { useContext, useEffect, useState } from 'react';
import DispatchContext from '../../../utils/DispatchContext';
import StateContext from '../../../utils/StateContext';
import { useImmerReducer } from 'use-immer';
import { getRandomQuestion, AnswerQuestion } from '../../../utils/requests';
import './question-component.css';
import LoadingDotsIcon from '../../loadingdots-component/LoadingDotsIcon';

const QuestionComponent = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const initialState = {
    title: {
      value: ''
    },
    body: {
      value: ''
    },
    difficulty: {
      value: ''
    },
    answer: {
      value: ''
    },
    answerOptions: {
      value: []
    },
    generatedAnswers: {
      value: []
    },
    id: '',
    answeredCorrectly: null,
    index: null,
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'setQuestion':
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.difficulty.value = action.value.difficulty;
        draft.answer.value = action.value.answer;
        draft.answerOptions.value = action.value.answerOptions;
        draft.id = action.value.id;
        break;
      case 'generateAnswers':
        draft.generatedAnswers.value = shuffle([
          ...action.value.answerOptions,
          action.value.correctAnswer
        ]);
        break;
      case 'correctlyAnswered':
        draft.answeredCorrectly = action.value;
        break;
      case 'setIndex':
        draft.index = action.value;
        break;
      case 'reset':
        draft.title.value = '';
        draft.body.value = '';
        draft.difficulty.value = '';
        draft.answer.value = '';
        draft.answerOptions.value = [];
        draft.difficulty.value = '';
        draft.generatedAnswers.value = [];
        draft.id = '';
        draft.answeredCorrectly = null;
        draft.index = null;
        break;
      case 'submitForm':
        console.log('increase count');
        draft.submitCount++;
        break;
      default:
    }
  }

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    console.log('getting new q');
    if (state.submitCount > 0 || state.title.value === '') {
      const randomQuestion = async () => {
        const response = await getRandomQuestion();
        if (response) {
          dispatch({ type: 'reset', value: null });
          dispatch({
            type: 'setQuestion',
            value: {
              title: response.data.data[0].title,
              body: response.data.data[0].question,
              difficulty: response.data.data[0].difficulty,
              answer: response.data.data[0].correctAnswer,
              answerOptions: response.data.data[0].answerOptions,
              id: response.data.data[0]._id
            }
          });
          dispatch({
            type: 'generateAnswers',
            value: {
              answerOptions: response.data.data[0].answerOptions,
              correctAnswer: response.data.data[0].correctAnswer
            }
          });
        } else {
          console.log("Couldn't fetch any question");
        }
      };
      randomQuestion();
    }
  }, [state.submitCount]);

  useEffect(() => {
    const generateAnswers = async () => {};
    generateAnswers();
  }, state.generatedAnswers.length);

  const handleSubmit = async e => {
    const index = parseInt(e.target.id.split('-').pop());
    const answer = state.generatedAnswers.value[index];
    dispatch({
      type: 'correctlyAnswered',
      value: answer === state.answer.value
    });
    dispatch({ type: 'setIndex', value: index });
    sendAnswer(answer);
  };

  const sendAnswer = answer => {
    const answerQuestion = async () => {
      const response = await AnswerQuestion({
        id: state.id,
        answer: answer
      });
      console.log(response);
    };
    answerQuestion();
    const delay = setTimeout(() => {
      dispatch({ type: 'submitForm', value: null });
    }, 2000);
    return () => clearTimeout(delay);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="question-app">
          {state.title.value !== '' && (
            <div className="question-section">
              <div className="question-count">
                <span style={{ fontSize: '5vw' }}>{state.title.value}</span>{' '}
                <span className="topcorner" style={{ fontSize: '2vw' }}>
                  {state.difficulty.value}
                </span>
              </div>
              <div className="question-text">{state.body.value}</div>
            </div>
          )}
          {state.title.value === '' && <LoadingDotsIcon />}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="answer-section">
          {state.generatedAnswers.value &&
            state.generatedAnswers.value.map((el, idx) => (
              <button
                key={idx}
                id={`button-${idx}`}
                className={
                  state.answeredCorrectly &&
                  state.answeredCorrectly != null &&
                  state.index === idx
                    ? 'question-button-correct'
                    : !state.answeredCorrectly &&
                      state.answeredCorrectly != null &&
                      state.index === idx
                    ? 'question-button-wrong'
                    : 'question-button'
                }
                value={el}
                onClick={handleSubmit}
              >
                {el}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;

// {
//   "status": "success",
//   "data": {
//       "data": [
//           {
//               "_id": "5f301c21e33fb68b754009eb",
//               "answerOptions": [
//                   "This is a wrong answer",
//                   "this is another wrong answer!",
//                   "this is a third wrong answer!"
//               ],
//               "timesAnswered": 0,
//               "timesCorrectAnswered": 0,
//               "title": "YMCA",
//               "question": "When referring to the worldwide youth organization based in Geneva, Switzerland, what does the acronym YMCA stand for?",
//               "correctAnswer": "Young Men’s Christian Association",
//               "difficulty": "hard",
//               "author": "5c8a1d5b0190b214360dc057",
//               "__v": 0
//           }
//       ]
//   }
// }
