var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'FUT-Wealth API' });
});

// router.get('/register', function(req, res) {
//     res.render('register', { });
// });
//
// router.post('/register', function(req, res, next) {
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//           return res.render('register', { error : err.message });
//         }
//
//         passport.authenticate('local')(req, res, function () {
//             req.session.save(function (err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 res.redirect('/');
//             });
//         });
//     });
// });

router.get('/login', (req, res) => {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/ping', auth.isAuthenticated, (req, res, next) => {
  res.status(200).send('pong');
});

router.get('/isauthenticated', (req, res, next) => {
  res.send(req.isAuthenticated());
});

module.exports = router;
