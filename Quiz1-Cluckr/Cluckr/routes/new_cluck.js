const express = require('express');
const router = express.Router();
const knex = require('../db');

function trackTrends(res, hashtags) {
  if (hashtags.length === 0) {
    res.redirect('/show_clucks');
  } else {
    let thisTrend = hashtags.pop()
    knex
      .insert({'hashtag': thisTrend, 'counter':1})
      .into('trends')
      .then(() => {
        trackTrends(res, hashtags);
      })
  }
}


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

  let hashtags = cluck_content.split(' ').filter(word => word[0] === "#")
  let hashtagsObj = [];
  // for (let hashtag of hashtags) {
  //   hashtagsObj.push({'hashtag': hashtag, 'counter': 1});
  // }

  knex
    .insert({
      username, cluck_content, image_url, profile_pic
    })
    .into('clucks')
    .then(() => {
      // if (hashtags.length > 0) {
      //   knex
      //     .insert(hashtagsObj)
      //     .into('trends')
      //     .then(() => {
      //       res.redirect('/show_clucks');
      //     })
      // } else {
      // res.redirect('/show_clucks');
      // }

      trackTrends(res, hashtags);
    })
});

module.exports = router;
