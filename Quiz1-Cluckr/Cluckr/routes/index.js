const express = require('express');
const router = express.Router();
const knex = require('../db');

// PATH: /index VERB: GET
router.get('/', (req, res) => {
  let username = req.cookies.username;
  res.render('index', {username});
});

// PATH: /index VERB: POST
router.post('/', (req, res) => {
  res.clearCookie('username');
  res.clearCookie('profile_pic');
  res.redirect('/');
});

module.exports = router;
