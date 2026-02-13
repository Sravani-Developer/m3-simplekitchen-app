const bcrypt = require('bcrypt');
const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = require('../models/Registration');


// Home Page
router.get('/', (req, res) => {
  res.render('index', { title: 'Simple Kitchen' });
});


// Register Page
router.get('/register', (req, res) => {
  res.render('form', { title: 'Registration form' });
});


// Thank You Page
router.get('/thank-you', (req, res) => {
  res.render('thank-you', { title: 'Thank You' });
});


// Registrants / Admin Page 
router.get('/registrants', (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('registrations', {
        title: 'Listing registrations',
        registrations,
        bodyClass: 'registrants-body'
      });
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


// Register Form POST
router.post(
  '/register',
  [
    check('name').isLength({ min: 1 }).withMessage('Please enter a name'),
    check('email').isLength({ min: 1 }).withMessage('Please enter an email'),
    check('username').isLength({ min: 1 }).withMessage('Please enter a username'),
    check('password').isLength({ min: 1 }).withMessage('Please enter a password'),
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }

    try {
      // Generate salt
      const salt = await bcrypt.genSalt(10);

      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new registration with hashed password
      const registration = new Registration({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      });

      await registration.save();

      return res.redirect('/thank-you');

    } catch (err) {
      console.log(err);
      return res.send('Sorry! Something went wrong.');
    }
  }
);

module.exports = router;
