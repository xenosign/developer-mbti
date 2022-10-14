const express = require('express');
const router = express.Router();

const db = require('../controllers/dataController');

router.get('/count', (req, res) => {
  db.getCounts((data) => {
    res.send(data);
  });
});

router.post('/inccount', (req, res) => {
  db.incCounts((msg) => {
    res.send(msg);
  });
});

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
