import React, { useEffect, useState, useContext } from 'react';
import {
  editQuestion,
  DoesQuestionExist,
  getQuestion
} from '../utils/requests';
import Page from '../pages/page';
import { CSSTransition } from 'react-transition-group';
import { useImmerReducer } from 'use-immer';
import { useParams, withRouter } from 'react-router-dom';
import DispatchContext from '../utils/DispatchContext';
import DropDown from '../components/dropdown-component/dropdown-component';
import DynamicList from '../components/page-components/list-component/list-component';
import NotFound from './notFound';
import LoadingDotsIcon from '../components/loadingdots-component/LoadingDotsIcon';

function EditQuestion(props) {
  const [difficulty, setDifficulty] = useState('easy');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [input, setInput] = useState('');
  const appDispatch = useContext(DispatchContext);
  const { id } = useParams();

  const initialState = {
    initialState: {
      title: '',
      body: '',
      difficulty: '',
      answer: '',
      answerOptions: ''
    },
    title: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: true,
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
      value: '',
      hasErrors: false,
      message: ''
    },
    isLoading: true,
    questionFound: false,
    isChanged: false,
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
        if (!action.value) {
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
        draft.isChanged = false;
        if (!draft.answer.value) {
          draft.answer.hasErrors = true;
          draft.answer.message = 'Define the correct answer';
        }
        break;
      case 'answerOptionsImmediately':
        draft.answerOptions.hasErrors = false;
        draft.answerOptions.value = action.value;
        if (draft.answerOptions.value.length === 0 && draft.submitCount > 0) {
          draft.answerOptions.hasErrors = true;
          draft.answerOptions.message = 'Define the answer options';
        } else if (draft.answerOptions.value.length > 3) {
          draft.answerOptions.hasErrors = true;
          draft.answerOptions.message = 'To many answer options';
        }
        break;
      case 'initialState':
        draft.initialState.title = action.value.title;
        draft.initialState.body = action.value.question;
        draft.initialState.difficulty = action.value.difficulty;
        draft.initialState.answer = action.value.correctAnswer;
        draft.initialState.answerOptions = action.value.answerOptions;
        break;
      case 'Loading':
        draft.isLoading = action.value;
        break;
      case 'QuestionFound':
        draft.questionFound = action.value;
        break;
      case 'QuestionChanged':
        draft.isChanged = action.value;
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
    // dispatch({ type: 'QuestionChanged', value: true });
  }, [difficulty]);

  useEffect(() => {
    dispatch({
      type: 'answerOptionsImmediately',
      value: answerOptions
    });
    // dispatch({ type: 'QuestionChanged', value: true });
  }, [answerOptions]);

  useEffect(() => {
    if (
      state.initialState.title !== '' &&
      (state.title.value !== state.initialState.title ||
        state.body.value !== state.initialState.body ||
        state.difficulty.value !== state.initialState.difficulty ||
        state.answer.value !== state.initialState.answer ||
        JSON.stringify(state.answerOptions.value) !==
          JSON.stringify(state.initialState.answerOptions))
    ) {
      dispatch({ type: 'QuestionChanged', value: true });
    } else {
      dispatch({ type: 'QuestionChanged', value: false });
    }
  }, [
    state.title,
    state.body,
    state.difficulty,
    state.answer,
    state.answerOptions
  ]);

  useEffect(() => {
    if (state.title.value && state.isChanged) {
      const delay = setTimeout(() => {
        const questionExist = async () => {
          const response = await DoesQuestionExist(state.title.value);

          let unqiue = false;
          if (
            response.data.message === 'OK' ||
            state.title.value === state.initialState.title
          )
            unqiue = true;

          dispatch({
            type: 'titleUniqueResults',
            value: unqiue
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
        const response = await editQuestion({
          id: id,
          title: state.title.value,
          question: state.body.value,
          correctAnswer: state.answer.value,
          answerOptions: state.answerOptions.value,
          difficulty: state.difficulty.value
        });
        try {
          console.log('resp:', response);
          if (response.status === 'success') {
            appDispatch({
              type: 'flashMessage',
              value: 'You have edited your question!'
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      question();
      return;
    }
  }, [state.submitCount]);

  useEffect(() => {
    const question = async () => {
      const response = await getQuestion(id);
      try {
        if (response.status === 'success') {
          const title = response.data.data.title;
          const question = response.data.data.question;
          const correctAnswer = response.data.data.correctAnswer;
          const difficulty = response.data.data.difficulty;
          const answerOptions = response.data.data.answerOptions;
          dispatch({ type: 'titleImmediately', value: title });
          dispatch({ type: 'bodyImmediately', value: question });
          dispatch({ type: 'correctAnswerImmediately', value: correctAnswer });
          setDifficulty(difficulty);
          setAnswerOptions(answerOptions);
          dispatch({
            type: 'initialState',
            value: { title, question, correctAnswer, difficulty, answerOptions }
          });
          dispatch({ type: 'Loading', value: false });
          dispatch({ type: 'QuestionFound', value: true });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: 'QuestionFound', value: false });
      }
    };
    question();
    return;
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
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
      {state.isLoading && <LoadingDotsIcon />}
      {state.isLoading && state.questionFound && <NotFound />}
      {!state.isLoading && (
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
              value={state.title.value}
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
              value={state.body.value}
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
              value={state.answer.value}
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
          <button disabled={!state.isChanged} className="btn btn-primary">
            Edit Question
          </button>
        </form>
      )}
    </Page>
  );
}

export default withRouter(EditQuestion);
