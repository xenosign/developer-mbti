const connection = require('../dbConnect');

const db = {
  getQuestion: (cb) => {
    connection.query('SELECT * FROM mydb.question', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  getSurvey: (cb) => {
    connection.query(
      'SELECT * FROM mydb.question LEFT JOIN mydb.answer ON mydb.question.id=mydb.answer.question_id',
      (err, data) => {
        if (err) throw err;
        cb(data);
      }
    );
  },
};

module.exports = db;
