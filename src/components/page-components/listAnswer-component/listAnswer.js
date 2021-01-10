import React, { useEffect, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { Link } from 'react-router-dom';
import { deleteQuestion } from '../../../utils/requests';
import DispatchContext from '../../../utils/DispatchContext';

function AnswerList(props) {
  const index = props.index;
  const questions = props.questions;
  const setQuestions = props.setQuestions;
  const appDispatch = useContext(DispatchContext);
  const question = props.question;
  const difficulty = question.difficulty;
  const timesAnswered = question.timesAnswered;
  const timesCorrectAnswered = question.timesCorrectAnswered;

  const initialState = {
    deleteRequest: false,
    submitCount: 0
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'deleteRequest':
        draft.deleteRequest = true;
        break;
      case 'CancelRequest':
        draft.deleteRequest = false;
        break;
      case 'Delete':
        if (draft.deleteRequest) {
          draft.submitCount++;
        }
        break;
      default:
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.submitCount > 0) {
      const removeQuestion = async () => {
        const response = await deleteQuestion(question._id);
        try {
          console.log('resp:', response);
          if (response.status === 'success') {
            appDispatch({
              type: 'flashMessage',
              value: 'You have deleted one of your questions!'
            });
          }
        } catch (error) {
          console.log(error);
        }
        return;
      };
      removeQuestion();
    }
  }, [state.submitCount]);

  const verifyDelete = e => {
    e.preventDefault();
    let new_questions = questions;
    new_questions.splice(index, 1);
    setQuestions(new_questions);
    dispatch({ type: 'Delete', value: true });
    console.log('index:', index);
    console.log('qs:', questions);
  };

  const requestDelete = e => {
    e.preventDefault();
    dispatch({ type: 'deleteRequest', value: true });
  };

  const cancelDelete = e => {
    e.preventDefault();
    dispatch({ type: 'CancelRequest', value: false });
  };

  return (
    <div className="container">
      <div className="col-md-12 mb-3">
        <div className="row d-flex align-items-center">
          <Link
            onClick={props.onClick}
            to={`/question/${question._id}/edit`}
            className="list-group-item list-group-item-action col mb-2"
          >
            <strong>{question.title}</strong> &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-muted small mr-10">
              {
                <>
                  Difficulty: {difficulty}, Answered {timesAnswered} times
                </>
              }{' '}
              and Correctly answered {timesCorrectAnswered}
              {''}
            </span>
          </Link>
          <div className="col mb-2 align-middle">
            {state.deleteRequest && (
              <div className="row d-flex align-items-center">
                <div className="ml-2">
                  <button className="btn btn-success" onClick={verifyDelete}>
                    &#10003;
                  </button>
                </div>
                <div className="ml-2">
                  <button className="btn btn-danger" onClick={cancelDelete}>
                    X
                  </button>
                </div>
              </div>
            )}
            {!state.deleteRequest && (
              <button className="btn btn-danger " onClick={requestDelete}>
                X
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerList;
