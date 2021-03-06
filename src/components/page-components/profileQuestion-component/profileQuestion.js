import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoadingDotsIcon from '../../loadingdots-component/LoadingDotsIcon';
import StateContext from '../../../utils/StateContext';
import QuestionList from '../listQuestion-component/listQuestion';
import { getMyQuestions } from '../../../utils/requests';

function ProfileQuestion(props) {
  const appState = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await getMyQuestions();
      if (response) {
        const questions = response.data.data;
        console.log('Questions', questions);
        setQuestions(questions);
      } else {
        console.log('no questions for this user');
      }
      setIsLoading(false);
    };
    getQuestions();
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {question.length > 0 &&
        question.map((el, idx) => {
          return (
            <QuestionList
              question={el}
              questions={question}
              key={el._id}
              index={idx}
              setQuestions={setQuestions}
            />
          );
        })}
      {question.length === 0 && (
        <p className="lead text-muted text-center">
          You haven&rsquo;t created any question yet;{' '}
          <Link to="/create-question">create one now!</Link>
        </p>
      )}
      {question.length === 0 && (
        <p className="lead text-muted text-center">No questions created yet.</p>
      )}
    </div>
  );
}

export default ProfileQuestion;
