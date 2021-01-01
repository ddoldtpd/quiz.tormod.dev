import LoadingDotsIcon from '../../loadingdots-component/LoadingDotsIcon';
import React, { useEffect, useState, useContext } from 'react';
import StateContext from '../../../utils/StateContext';
import { Link } from 'react-router-dom';

function ProfileAnswer(props) {
  const appState = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log('get answered questions');
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {questions.length > 0 &&
        questions.map((follower, index) => {
          return (
            <Link
              key={index}
              to={`/profile/answered-questions`}
              className="list-group-item list-group-item-action"
            >
              <div>hello</div>
            </Link>
          );
        })}
      {questions.length === 0 && (
        <p className="lead text-muted text-center">
          You haven&rsquo;t answered any questions yet.
        </p>
      )}
    </div>
  );
}

export default ProfileAnswer;
