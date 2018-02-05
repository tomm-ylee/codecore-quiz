const express = require('express');
const router = express.Router();
const knex = require('../db');

// PATH: /sign_in VERB: GET
router.get('/', (req, res) => {
  let username = req.cookies.username;

  res.render('sign_in', {username});
});

// PATH: /sign_in VERB: POST
MAX_LOGIN_AGE = 1000 * 60 * 60 * 24 * 7 * 2;
DEFAULT_PROFILE = "https://thecliparts.com/wp-content/uploads/2017/06/bucket-of-fried-chicken-clipart.png";

router.post('/', (req, res) => {
  if (req.body.username) {
    res.cookie('username', req.body.username, {maxAge: MAX_LOGIN_AGE});
    if (req.body.profile_pic) {
      res.cookie('profile_pic', req.body.profile_pic, {maxAge: MAX_LOGIN_AGE});
    } else {
      res.cookie('profile_pic', DEFAULT_PROFILE, {maxAge: MAX_LOGIN_AGE});
    }
    res.redirect('/');
  } else {
    res.redirect('/sign_in');
  }
});

module.exports = router;
