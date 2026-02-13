const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/simplekitchen');

// Load the Registration model
require('./models/Registration');

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

module.exports = app;
