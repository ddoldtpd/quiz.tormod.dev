import React, { useEffect, useState, useContext } from 'react';
import { createQuestion, DoesQuestionExist } from '../utils/requests';
import Page from '../pages/page';
import { CSSTransition } from 'react-transition-group';
import { useImmerReducer } from 'use-immer';
import { withRouter } from 'react-router-dom';
import DispatchContext from '../utils/DispatchContext';
import DropDown from '../components/dropdown-component/dropdown-component';
import DynamicList from '../components/page-components/list-component/list-component';

function CreatePost(props) {
  const [difficulty, setDifficulty] = useState('easy');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [input, setInput] = useState('');
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    title: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: false,
      checkCount: 0
    },
    body: {
      value: '',
      hasErrors: false,
      message: '',
      checkCount: 0
    },
    difficulty: {
      value: '',
      hasErrors: false,
      message: ''
    },
    answer: {
      value: '',
      hasErrors: false,
      message: ''
    },
    answerOptions: {
      value: [],
      hasErrors: false,
      message: ''
    },
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'titleImmediately':
        draft.title.hasErrors = false;
        draft.title.value = action.value;
        if (draft.title.value.length > 100) {
          draft.title.hasErrors = true;
          draft.title.message = 'Title is to long';
        } else if (draft.title.value.length <= 10) {
          draft.title.hasErrors = true;
          draft.title.message = 'Question title is to short';
        } else if (draft.title.value.length === 0) {
          draft.title.hasErrors = true;
          draft.title.message = 'Question must have a title';
        }
        break;
      case 'titleUniqueResults':
        if (action.value) {
          draft.title.hasErrors = true;
          draft.title.isUnique = false;
          draft.title.message = 'Question with that title already exist';
        } else {
          draft.title.isUnique = true;
        }
        break;
      case 'bodyImmediately':
        draft.body.hasErrors = false;
        draft.body.value = action.value;
        if (draft.body.value.length > 500) {
          draft.body.hasErrors = true;
          draft.body.message = 'Question is to long';
        }
        break;
      case 'bodyAfterDelay':
        if (draft.body.value.length < 10) {
          draft.body.hasErrors = true;
          draft.body.message = 'Question is to short';
        }
        break;
      case 'difficultyImmediately':
        draft.difficulty.hasErrors = false;
        draft.difficulty.value = action.value;
        if (!['easy', 'medium', 'hard'].includes(draft.difficulty.value)) {
          draft.difficulty.hasErrors = true;
          draft.difficulty.message = 'Define difficulty';
        }
        break;
      case 'correctAnswerImmediately':
        draft.answer.hasErrors = false;
        draft.answer.value = action.value;
        if (!draft.answer.value) {
          draft.answer.hasErrors = true;
          draft.answer.message = 'Define the correct answer';
        }
        if (draft.answer.value.length > 50) {
          draft.answer.hasErrors = true;
          draft.answer.message = 'Answer is to long';
        }
        break;
      case 'answerOptionsImmediately':
        draft.answerOptions.hasErrors = false;
        draft.answerOptions.value = action.value;
        if (draft.answerOptions.value.length === 0 && draft.submitCount > 0) {
          draft.answerOptions.hasErrors = true;
          draft.answerOptions.message = 'Define the answer options';
        }
        if (draft.answerOptions.value.length > 3) {
          draft.answerOptions.hasErrors = true;
          draft.answerOptions.message = 'To many answer options';
        }
        draft.answerOptions.value.forEach(el => {
          if (el.length > 50) {
            draft.answerOptions.hasErrors = true;
            draft.answerOptions.message =
              'One of your answer options is to long';
          }
        });
        break;
      case 'submitForm':
        if (
          !draft.title.hasErrors &&
          draft.title.isUnique &&
          !draft.body.hasErrors &&
          !draft.difficulty.hasErrors &&
          !draft.answer.hasErrors &&
          !draft.answerOptions.hasErrors
        ) {
          draft.submitCount++;
        }
        break;
      default:
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.body.value) {
      const delay = setTimeout(() => dispatch({ type: 'bodyAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.body.value]);

  useEffect(() => {
    dispatch({
      type: 'difficultyImmediately',
      value: difficulty
    });
  }, [difficulty]);

  useEffect(() => {
    dispatch({
      type: 'answerOptionsImmediately',
      value: answerOptions
    });
  }, [answerOptions]);

  useEffect(() => {
    if (state.title.value) {
      const delay = setTimeout(() => {
        const questionExist = async () => {
          const response = await DoesQuestionExist(state.title.value);
          dispatch({
            type: 'titleUniqueResults',
            value: response.data.message !== 'OK'
          });
        };
        questionExist();
      }, 1500);
      return () => clearTimeout(delay);
    }
  }, [state.title.value]);

  useEffect(() => {
    if (state.submitCount) {
      const question = async () => {
        const response = await createQuestion({
          title: state.title.value,
          question: state.body.value,
          correctAnswer: state.answer.value,
          answerOptions: state.answerOptions.value,
          difficulty: state.difficulty.value
        });

        console.log('resp:', response);
        if (response.status === 'success') {
          appDispatch({
            type: 'flashMessage',
            value: 'You created a new question!'
          });
        }
      };
      question();
      return;
    }
  }, [state.submitCount]);

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch({ type: 'titleUniqueResults', value: state.title.value });
    dispatch({ type: 'titleImmediately', value: state.title.value });
    dispatch({ type: 'bodyImmediately', value: state.body.value });
    dispatch({ type: 'bodyAfterDelay', value: state.body.value });
    dispatch({ type: 'difficultyImmediately', value: state.difficulty.value });
    dispatch({ type: 'correctAnswerImmediately', value: state.answer.value });
    dispatch({
      type: 'answerOptionsImmediately',
      value: state.answerOptions.value
    });
    dispatch({ type: 'submitForm' });
  }

  const handleAddAnswer = e => {
    e.preventDefault();
    setAnswerOptions(answerOptions.concat(input));
    setInput('');
    document.getElementById('answer-options').value = '';
  };

  return (
    <Page title="Create New Question">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={e =>
              dispatch({
                type: 'titleImmediately',
                value: e.target.value
              })
            }
            autoFocus
            name="title"
            id="question-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
          <CSSTransition
            in={state.title.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="alert alert-danger small liveValidateMessage">
              {state.title.message}
            </div>
          </CSSTransition>
        </div>
        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Question</small>
          </label>
          <textarea
            onChange={e =>
              dispatch({
                type: 'bodyImmediately',
                value: e.target.value
              })
            }
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
          <CSSTransition
            in={state.body.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="alert alert-danger small liveValidateMessage">
              {state.body.message}
            </div>
          </CSSTransition>
        </div>
        <div className="form-group">
          <label htmlFor="correct-answer" className="text-muted mb-1">
            <small>Correct Answer</small>
          </label>
          <input
            onChange={e =>
              dispatch({
                type: 'correctAnswerImmediately',
                value: e.target.value
              })
            }
            autoFocus
            name="Correct Answer"
            id="correct-answer"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
          <CSSTransition
            in={state.answer.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="alert alert-danger small liveValidateMessage">
              {state.answer.message}
            </div>
          </CSSTransition>
        </div>
        <label htmlFor="correct-answer" className="text-muted mb-1">
          <small>Difficulty</small>
        </label>
        <DropDown selectItem={setDifficulty} />
        <CSSTransition
          in={state.difficulty.hasErrors}
          timeout={330}
          classNames="liveValidateMessage"
          unmountOnExit
        >
          <div className="alert alert-danger small liveValidateMessage">
            {state.difficulty.message}
          </div>
        </CSSTransition>
        <label htmlFor="correct-answer" className="text-muted mb-1">
          <small>Answer alternatives</small>
        </label>
        <DynamicList items={answerOptions} setItems={setAnswerOptions} />
        <CSSTransition
          in={state.answerOptions.hasErrors}
          timeout={330}
          classNames="liveValidateMessage"
          unmountOnExit
        >
          <div className="alert alert-danger small liveValidateMessage">
            {state.answerOptions.message}
          </div>
        </CSSTransition>
        <div className="form-group">
          <label htmlFor="answer-options" className="text-muted mb-1">
            <small>Add an answer option</small>
          </label>
          <div className="row">
            <div className="col mb-2">
              <input
                onChange={e => setInput(e.target.value)}
                autoFocus
                name="Answer Option"
                id="answer-options"
                className="form-control form-control-lg form-control-title"
                type="text"
                placeholder=""
                autoComplete="off"
              />
            </div>
            <div className="col mb-2">
              <button
                className="btn btn-success"
                disabled={input.length === 0}
                onClick={handleAddAnswer}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Create New Question</button>
      </form>
    </Page>
  );
}

export default withRouter(CreatePost);
