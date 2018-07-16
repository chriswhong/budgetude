import React, { Component } from 'react';

const About = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>NYC Budgetude: A budget app for New York City</h3>

          <p>This app uses NYC Open Data for the FY19 operating budget, and allows you to drill-down through the hierarchy of each agency&apos;s budget.</p>

          <p>By <a href="https://twitter.com/chris_whong">@chris_whong</a>.  Give me a yell on twitter if you like it, hate it, or have questions.</p>

          <p><a href="https://github.com/chriswhong/budgetude">Github</a> (help wanted!)</p>
        </div>
      </div>
    </div>
  );
};

export default About;
