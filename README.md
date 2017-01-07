# React Starter App on Node

## Preamble

This is an easy to use starting point with basic login/signup functionality that anyone can use to start a react-app. It uses postgres as a database and will initially require you to create a db with the name "my-react-app" for development and "my-react-app-test" for testing purposes. The database and database names can easily be switched out with some basic editing of the files in the config folder.

## Getting Started Locally

Before you get started, you will need npm and node installed locally on your device. For instructions on how to do so, go <a href="http://blog.npmjs.org/post/85484771375/how-to-install-npm" target="_blank">here</a>.

#### Step 1: Clone the repository and cd into folder:

    git clone https://github.com/dejongnj/react-app.git my-react-app
    cd my-react-app

#### Step 2: Install the dependencies
    
    npm install

#### Step 3: Build/Compile Your Code

    npm run dev

#### Step 4: Start the server

    npm start

#### Step 5: Checkout your app

Go to localhost:3001

## Getting Started With Development

The index.jsx in src/client/jsx is the entry point into your react. While you develop you should have two terminals running:

Your first terminal is where you run your server with npm start as above. In a separate terminal window run webpack (installed during npm install) using the command:

    npm run dev

## Testing

The tests and test folders are written to mirror the file structure on the app, so the test for a particular component can easily be found.

## Deploying to Heroku

The app is configured to be able to esily upload to Heroku. Once you have a Heroku account and the Heroku CLI installed, you can follow the steps below to get the app up and running:

#### Create the Heroku App

    heroku create

#### Provision the Postgres Database Addon

For a detailed explanation, check the heroku documentation <a href="https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-the-add-on" target="_blank">here</a>. The commands below should work to get you started on the free hobby-dev tier for your database.

    heroku addons:create heroku-postgresql:hobby-dev
    heroku addons | grep -i POSTGRES // => logs out your database details

#### Set Your Environment Variables

In order for your app to work, you will the following environment variables:

- DATABASE_URL: this is set up automatically if you used Heroku to install a database
- SESSION_SECRET: this is used to manage and secure your sessions

To add an environment variable in heroku use the syntax:

    heroku config:set VARIABLE_ONE_NAME=theSecretForVariableOne VARIABLE_TWO_NAME=theSecretForVariableTwo

E.g. to set the SESSION_SECRET

    heroku config:set SESSION_SECRET=replaceThisTextWithYourOwnSecret

#### Push Your App to Heroku

    git push heroku master

#### Initialize Your Database

    heroku run node seed/dbInit

Your app should now be live and at the url for your heroku app. Happy Coding!
