import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuestionList(props) {
  const question = props.question;
  const date = new Date(question.createdDate);
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Link
      onClick={props.onClick}
      to={`/question/${question._id}`}
      className="list-group-item list-group-item-action"
    >
      <strong>{question.title}</strong>{' '}
      <span className="text-muted small">
        {!props.noAuthor && <>by {question.author.username}</>} on{' '}
        {dateFormatted}{' '}
      </span>
    </Link>
  );
}

export default QuestionList;
