import React from 'react';
import Page from './page';

function Terms() {
  return (
    <Page title="Terms and Condition">
      <div className="text-center">
        <h2>Terms and Condition</h2>
        <p className="lead text-muted">
          This website was created by me,
          <a href="https://tormod.dev"> Fredrik Tormod</a>, as a hobby project
          for developing my skills as a software/cloud developer. Feel free to
          steal as much as you can from this site if it suits you.
        </p>
      </div>
    </Page>
  );
}

export default Terms;
