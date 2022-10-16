const express = require('express');
const router = express.Router();

const db = require('../controllers/dataController');
const mongoDB = require('../controllers/mongoController');

router.get('/count', (req, res) => {
  db.getCounts((data) => {
    res.send(data);
  });
});

router.get('/mongoCount', async (req, res) => {
  const counts = await mongoDB.getCounts();
  res.send(counts);
});

router.post('/inccount', (req, res) => {
  db.incCounts((msg) => {
    res.send(msg);
  });
});

router.post('/mongoInccount', async (req, res) => {
  const msg = await mongoDB.incCounts();
  res.send(JSON.stringify(msg));
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
