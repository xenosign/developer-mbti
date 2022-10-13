const express = require('express');
const router = express.Router();

const db = require('../controllers/dataController');

router.get('/', (req, res) => {
  db.getSurvey((data) => {
    res.send({ survey: data });
  });
});

router.get('/explaination', (req, res) => {
  db.getSurvey((data) => {
    res.send({ answer: data });
  });
});

module.exports = router;
