const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const path = require('path');
const auth = require('http-auth');

const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  res.render('index', { title: 'Simple Kitchen' });
});

router.get('/register', (req, res) => {
  res.render('form', { title: 'Registration form' });
});

router.get('/thank-you', (req, res) => {
  res.render('thank-you', { title: 'Thank You' });
});

router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('registrations', { title: 'Listing registrations', registrations, bodyClass: 'registrants-body' });
    })
    .catch(() => { 
      res.send('Sorry! Something went wrong.'); 
    });
}));

router.get('/registrants', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('registrations', { title: 'Listing registrations', registrations, bodyClass: 'registrants-body' });
    })
    .catch(() => { 
      res.send('Sorry! Something went wrong.'); 
    });
}));

router.post('/register', 
    [
        check('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
        check('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
    ],
    (req, res) => {
        //console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          const registration = new Registration(req.body);
          registration.save()
            .then(() => {res.redirect('/thank-you');})
            .catch((err) => {
              console.log(err);
              res.send('Sorry! Something went wrong.');
            });
          } else {
            res.render('form', { 
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
             });
          }
    });

module.exports = router;
