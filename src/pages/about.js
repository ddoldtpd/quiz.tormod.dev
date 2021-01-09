import React from 'react';
import Page from './page';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
// import overviewSVG from './../overview.svg';

function About() {
  return (
    <Page title="About QuizApp">
      <div>
        <h2 className="text-center">About QuizApp</h2>
        <p className="lead text-muted">
          This website is a quiz application where you can create your own
          questions and answer others. Sign up in order to create your own
          questions and to keep track of your score. Otherwise just visit the{' '}
          <Link to="/">homepage</Link> and answer existing questions, just for
          fun!
        </p>
        <h4 className="text-center mt-5">Technology</h4>
        <p className="lead text-muted">
          The website is built using a complete serverless technology stack. It
          is a classic MERN (MongoDB, Express, React, NodeJS) SPA application
          running on the AWS cloud. The frontend us built using basic bootstrap
          and common npm packages. In the backend a REST API is running in an
          AWS Lambda. This works very well since the application is stateless.
          However, there is trade off with coldstart which you might experience
          when using the application. Some effort was made to mitigate this and
          provisioned concurrency has been enabled. The entire application is
          deployed using cloudformation and IaC.
        </p>
        <p className="lead text-muted">
          In the image below a overview of the application infrastructure in AWS
          is represented, as well as the workflow.
        </p>
        <div className="text-center mt-5">
          <img src={require('./../overview.svg')} alt="AWS_overview" />
        </div>
      </div>
    </Page>
  );
}

export default About;
