const connection = require('../dbConnect');

const db = {
  getCounts: (cb) => {
    connection.query('SELECT counts FROM mydb.visitor;', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  incCounts: (cb) => {
    connection.query(
      'UPDATE mydb.visitor SET counts = counts + 1 WHERE id = 1;',
      (err) => {
        if (err) throw err;
        cb(JSON.stringify('업데이트 성공'));
      }
    );
  },
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
