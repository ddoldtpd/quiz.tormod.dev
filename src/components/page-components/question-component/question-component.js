import React, { useContext, useEffect, useState } from 'react';
import DispatchContext from '../../../utils/DispatchContext';
import StateContext from '../../../utils/StateContext';
import { getRandomQuestion, answerQuestion } from '../../../utils/requests';
import AnswerButtonComponent from '../../input-components/answer-button-component/answer-button-component';

const QuestionComponent = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const randomQuestion = async () => {
      const response = await getRandomQuestion();
      if (response) {
        setQuestion(response.data.data[0]);
      } else {
      }
    };
    randomQuestion();
  }, []);

  const renderAnswerButtons = () => {
    // return (
    //   question.answerOptions && (
    //     <AnswerButtonComonent options={question.answerOptions} />
    //   )
    // question.answerOptions.map((element, index) => {
    //   return <button key={index}>{element}</button>;
    // })
    // );
  };

  const handleSubmit = async value => {
    console.log(value);
    console.log(question._id);
    console.log(appState.user.token);
    const response = await answerQuestion(
      value,
      question._id,
      appState.user.token
    );
    console.log(response);
  };

  return (
    <>
      <div style={Wrapper}>
        <div style={QuestionWrapper}>
          <div style={TitleBox}>{question.title}</div>
          <div style={QuestionBox}>{question.question}</div>
          <div style={AnswerBox}>
            {question.answerOptions && (
              <AnswerButtonComponent
                onClick={handleSubmit}
                options={question.answerOptions}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SubmitBox = {
  margin: '10px auto auto auto',
  height: '20%',
  width: '80%',
  background: 'black'
};

const AnswerBox = {
  margin: '10px auto auto auto',
  height: '20%',
  width: '80%'
};

const TitleBox = {
  margin: '10px auto auto auto',
  textAlign: 'center',
  fontSize: '3rem',
  background: 'red'
};

const QuestionBox = {
  margin: '20px auto auto auto',
  height: '60%',
  width: '80%',
  background: 'blue'
};
const QuestionWrapper = {
  margin: '50px auto 50px auto',
  height: '500px',
  width: '800px',
  background: 'grey'
};
const Wrapper = {
  display: 'flex',
  height: '100%',
  width: '100%'
};

export default QuestionComponent;

// {
//   "status": "success",
//   "data": {
//       "data": [
//           {
//               "_id": "5f301c21e33fb68b754009eb",
//               "answerOptions": [
//                   "This is a wrong answer",
//                   "this is another wrong answer!",
//                   "this is a third wrong answer!"
//               ],
//               "timesAnswered": 0,
//               "timesCorrectAnswered": 0,
//               "title": "YMCA",
//               "question": "When referring to the worldwide youth organization based in Geneva, Switzerland, what does the acronym YMCA stand for?",
//               "correctAnswer": "Young Men’s Christian Association",
//               "difficulty": "hard",
//               "author": "5c8a1d5b0190b214360dc057",
//               "__v": 0
//           }
//       ]
//   }
// }
