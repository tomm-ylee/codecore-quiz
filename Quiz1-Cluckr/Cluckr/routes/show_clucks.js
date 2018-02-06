const express = require('express');
const router = express.Router();
const knex = require('../db');

// PATH: /index VERB: GET
router.get('/', (req, res) => {
  let username = req.cookies.username;
  knex
    .select()
    .from('clucks')
    .orderBy('created_at', 'DESC')
    .limit(10)
    .then(allClucks => {
      knex
        .select()
        .from('trends')
        .whereNotNull('counter')
        .orderBy('counter', 'DESC')
        .limit(10)
        .then(allTrends => {
          res.render('show_clucks', {username, allClucks, allTrends});
        })
    });
});

// PATH: /index VERB: POST
router.post('/:id/delete', (req, res) => {
  let cluckId = req.params.id

  knex('clucks')
  .where('id', cluckId)
  .del()
  .then(() => {
    res.redirect('/show_clucks');
  });

});

module.exports = router;
