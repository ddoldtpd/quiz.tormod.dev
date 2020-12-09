import React, { useState } from 'react';
import QuestionComponent from '../components/page-components/question-component/question-component';
import { getQuestions } from '../utils/requests';

const Home = () => {
  const [questions, setQuestions] = useState([]);

  const handleClick = async () => {
    const resp = await getQuestions();
    console.log(resp.data.data);
    setQuestions(resp.data.data);
  };

  return (
    <div>
      <QuestionComponent></QuestionComponent>
    </div>
  );
};

export default Home;
