import React from 'react';
import { renderParagraphs } from './InfoParagraph';

const paragraphs = `React-app was built on the idea that a starting point for an app with login and authentication capabilities in react should be as simple as possible, but not any simpler. As such, though some seemingly unecessary elements such as a testing suite are present, they are purposefully put there since it is an integral part of software development.
This app is implemented using Node 7 on the server-side. The (smart?) choices with regards to choosing technologies, are outlined below.
React-app uses postgres for its database, and sequelize as an ORM. It uses express-sessions but is not connected to a third party session-store. This means, as stated on the express-session github profile, the default store is not production ready. However, for the purposes of testing and development everything should work well, and integrating with a compatible session store will not be difficult.
React-app also includes a basic testing environment with tests to test the current code. These are easy to build off. They use AirBnB's Enzyme to test react components, along with mocha, chai and sinon.
React-app is programmed using primarily es6 and some newer syntatic features like async-await on the server. It uses webpack, babel and node-sass to transpile code into regular javascript and css.
React-app uses react-router for front-end routes, and react-redux to manage the state of the frontend.
Finally, react-app uses BootstrapCS with limited custom styling to leave the app styles as easy to change as possible.`;

const horizontalStyle = {
  minHeight: '15vh',
  lineHeight: '15vh',
};

const About = () => (
  <div id="about-page">
    <h1 className="text-center">About React-App</h1>
    {renderParagraphs(paragraphs, horizontalStyle)}
  </div>
);

export default About;
