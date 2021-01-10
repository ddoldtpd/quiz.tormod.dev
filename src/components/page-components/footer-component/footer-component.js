import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <div className="footer-custom">
      <footer className="border-top text-center small text-muted">
        <p className="mt-3">
          <Link to="/" className="mx-1">
            Home
          </Link>{' '}
          |
          <Link className="mx-1" to="/about-QuizApp">
            About QuizApp
          </Link>{' '}
          |
          <Link className="mx-1" to="/terms">
            Terms
          </Link>
        </p>
        <p className="m-0">
          Copyright &copy; 2020{' '}
          <a href="/" className="text-muted">
            QuizApp
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
