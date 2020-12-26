import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingDotsIcon from './LoadingDotsIcon';
import StateContext from '../StateContext';
import QuestionList from '../listQuestion-component/listQuestion';
import { getMyQuestions } from '../../../utils/requests';

function ProfileQuestion(props) {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await getMyQuestions();
        setQuestions(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log('There was a problem.');
      }
    }
    fetchQuestion();
  }, [username]);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {question.length > 0 &&
        question.map(post => {
          return <QuestionList noAuthor={true} post={post} key={post._id} />;
        })}
      {question.length === 0 && appState.user.username === username && (
        <p className="lead text-muted text-center">
          You haven&rsquo;t created any question yet;{' '}
          <Link to="/create-post">create one now!</Link>
        </p>
      )}
      {question.length === 0 && appState.user.username !== username && (
        <p className="lead text-muted text-center">
          {username} hasn&rsquo;t created any posts yet.
        </p>
      )}
    </div>
  );
}

export default ProfileQuestion;
