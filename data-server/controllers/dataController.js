const connection = require('../dbConnect');

const db = {
  getSurvey: (cb) => {
    connection.query(
      'SELECT * FROM mydb.question LEFT JOIN mydb.answer ON mydb.question._id=mydb.answer.question_id',
      (err, data) => {
        if (err) throw err;
        cb(data);
      }
    );
  },
  getExplaination: (cb) => {
    connection.query('SELECT * FROM mydb.explaination', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
};

module.exports = db;
