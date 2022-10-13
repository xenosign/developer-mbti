const express = require('express');
const router = express.Router();

const db = require('../controllers/dataController');

router.get('/survey', (req, res) => {
  db.getSurvey((data) => {
    res.send(data);
  });
});

router.get('/explaination', (req, res) => {
  db.getExplaination((data) => {
    res.send(data);
  });
});

module.exports = router;
