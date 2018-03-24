const express = require('express');
const router = express.Router();
const knex = require('../db');

// Purpose of this function is to add a hashtag to the trends table one at a
// time using a recursive approach. If a hashtag has been seen before, it will
// increment the use of it by 1. When we get through all the hashtags from a
// comment, we will render the show_clucks page.

function trackTrends(res, hashtags) {
  if (hashtags.length === 0) {
    res.redirect('/show_clucks');
  } else {
    let thisTrend = hashtags.pop()
    knex
    .select()
    .from('trends')
    .where('hashtag', thisTrend)
    .then(check => {
      if (check.length === 0) {
        knex
          .insert({'hashtag': thisTrend, 'counter' : 1})
          .into('trends')
          .then(() => {
            trackTrends(res, hashtags);
          });
      } else {
        knex('trends')
          .where('hashtag', thisTrend)
          .increment('counter', 1)
          .then(() => {
            trackTrends(res, hashtags);
          })
      }
    })
  }
}


// ALL ROUTE PATHS BELOW

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

  knex
    .insert({
      username, cluck_content, image_url, profile_pic
    })
    .into('clucks')
    .then(() => {
      // Use trackTrends function to modify the trends database table.
      // Also passing res object so we may use res.render from the function.
      trackTrends(res, hashtags);
    })
});

module.exports = router;
