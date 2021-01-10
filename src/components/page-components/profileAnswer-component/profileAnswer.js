import LoadingDotsIcon from '../../loadingdots-component/LoadingDotsIcon';
import React, { useEffect, useState, useContext } from 'react';
import StateContext from '../../../utils/StateContext';
import { Link } from 'react-router-dom';
import { getMe } from '../../../utils/requests';
import QuestionList from '../listQuestion-component/listQuestion';

function ProfileAnswer(props) {
  const appState = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getMyInfo = async () => {
      const response = await getMe();
      if (response) {
        const questions = response.data.data;
        console.log('Questions', questions.userScore.answeredQuestions);
        setQuestions(questions.userScore.answeredQuestions);
      } else {
        console.log('no questions for this user');
      }
      setIsLoading(false);
    };
    getMyInfo();
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {questions.length > 0 &&
        questions.map((el, idx) => {
          return (
            <div>{el}</div>
            // <QuestionList
            //   question={el}
            //   questions={'question'}
            //   key={el._id}
            //   index={idx}
            //   setQuestions={setQuestions}
            // />
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
