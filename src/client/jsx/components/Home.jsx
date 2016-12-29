import React from 'react';
import { Link } from 'react-router';
import { renderParagraphs } from './InfoParagraph';

const leadParagraph = `
Starting point for building a react app with signup/login functionality, licensed under the MIT License.
`;

const explanatoryParagraphs = `Sometimes the most difficult part of a project is getting started. And then having to reinvent the wheel. Here is a great starter app for react-developers from which anyone can build. It offers an easy way for anyone to get started with programming in react-redux, and then tying in the built in login/signup functionality.
The reason I built this was to take the grunt work out of setting up a lot of boilerplate code, and instead decided to go with some sensible defaults. I also endeavored to set up a testing environment with some basic tests off of which anyone can build. This makes test-driven-development easier to implement right off the bat, without struggling to set up the environments yourself.
Please feel free to add your suggestions, bearing in mind the purpose of this app, and/or fixes to bugs you experience.`;


const Home = () => (
  <div>
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3 text-center">React Staring Point App</h1>
        <p className="lead text-center">{leadParagraph}</p>
        <p className="lead text-center">
          <Link to="/about" className="btn btn-primary btn-lg">Learn more</Link>
        </p>
      </div>
    </div>
    <div className="negate-jumbotron" id="home-info">
      {renderParagraphs(explanatoryParagraphs)}
    </div>
  </div>
);

export default Home;
