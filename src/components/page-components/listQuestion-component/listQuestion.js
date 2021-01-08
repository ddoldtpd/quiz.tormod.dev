import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuestionList(props) {
  const question = props.question;
  const difficulty = question.difficulty;
  const timesAnswered = question.timesAnswered;
  const timesCorrectAnswered = question.timesCorrectAnswered;

  // answerOptions: ["2021"]
  // author: "5fd3a7b98990050008e5e875"
  // correctAnswer: "2020"
  // difficulty: "easy"
  // question: "What year is it?"
  // timesAnswered: 0
  // timesCorrectAnswered: 0
  // title: "Live question from Prod"
  // __v: 0
  // _id: "5fedd4c00c51d80008c8757a"

  return (
    <Link
      onClick={props.onClick}
      to={`/question/${question._id}/edit`}
      className="list-group-item list-group-item-action"
    >
      <strong>{question.title}</strong> &nbsp;&nbsp;&nbsp;&nbsp;
      <span className="text-muted small">
        {
          <>
            Difficulty: {difficulty}, Answered {timesAnswered} times
          </>
        }{' '}
        and Correctly answered {timesCorrectAnswered}{' '}
      </span>
    </Link>
  );
}

export default QuestionList;
