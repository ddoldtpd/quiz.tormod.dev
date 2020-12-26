import React, { useEffect, useState, useContext } from 'react';
import { createQuestion, DoesQuestionExist } from '../utils/requests';
import Page from '../pages/page';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import DispatchContext from '../utils/DispatchContext';
import StateContext from '../utils/StateContext';
import DropDown from '../components/dropdown-component/dropdown-component';
import DynamicList from '../components/page-components/list-component/list-component';

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [difficulty, setDifficulty] = useState('Easy');
  const [answer, setAnswer] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [input, setInput] = useState('');
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response;
      response = DoesQuestionExist(title);
      console.log(response);
      createQuestion(title, body, answer, answerOptions, difficulty);
      appDispatch({
        type: 'flashMessage',
        value: 'Congrats, you created a new post.'
      });
      // props.history.push(`/post/${response.data}`);
      console.log('New post was created.');
    } catch (e) {
      console.log('There was a problem.');
    }
  }

  const handleAddAnswer = e => {
    e.preventDefault();
    setAnswerOptions(answerOptions.concat(input));
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
            onChange={e => setTitle(e.target.value)}
            autoFocus
            name="title"
            id="question-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Question</small>
          </label>
          <textarea
            onChange={e => setBody(e.target.value)}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="correct-answer" className="text-muted mb-1">
            <small>Correct Answer</small>
          </label>
          <input
            onChange={e => setAnswer(e.target.value)}
            autoFocus
            name="Correct Answer"
            id="correct-answer"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>
        <label htmlFor="correct-answer" className="text-muted mb-1">
          <small>Difficulty</small>
        </label>
        <DropDown selectItem={setDifficulty} />
        <label htmlFor="correct-answer" className="text-muted mb-1">
          <small>Answer alternatives</small>
        </label>
        <DynamicList items={answerOptions} setItems={setAnswerOptions} />
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
