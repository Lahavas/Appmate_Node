const express = require('express');

const bodyParser = require('body-parser');

// const passport = require('passport');

const projects = require('./routers/project/projects');
const users = require('./routers/user/users');

const error = require('./error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());

app.use('/users', users);
app.use('/projects', projects);

app.use(error.handler);

module.exports = app;
