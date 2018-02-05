const express = require('express');
const router = express.Router();
const knex = require('../db');

// PATH: /index VERB: GET
router.get('/', (req, res) => {
  let username = req.cookies.username;
  res.render('new_cluck', {username});
});

// PATH: /index VERB: POST
router.post('/', (req, res) => {
  let cluck_content = req.body.content;
  let image_url = req.body.image_url;
  let username = req.cookies.username;
  let profile_pic = req.cookies.profile_pic

  let hashes = cluck_content.split(' ').filter(word => word[0] === "#")

  knex
    .insert({
      username, cluck_content, image_url, profile_pic
    })
    .into('clucks')
    .then(() => {
      // if (hashes.length > 0) {
      //   knex
      //     .insert({'hashtag': hashes[0], 'counter': 1})
      //     .
      // } else {
      // res.redirect('/show_clucks');
      // }
      res.redirect('/show_clucks');
    })
});

module.exports = router;
