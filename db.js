const mysql = require('mysql');
// const util = require('util');

function createConnection(host, user, database, password) {
  const connection = mysql.createConnection({
    host,
    user,
    database,
    password,
  });
  connection.connect((error) => {
    if (error) {
      console.log('ERROR: ' + error);
    } else {
      console.log('MySQL is connected...');
    }
  });
  return connection;
}
const connection = createConnection(
  process.env.HOST,
  process.env.USER,
  process.env.DATABASE,
  process.env.PASSWORD
);
module.exports.createConnection = createConnection;
module.exports.connection = connection;
// const queryPromise = util.promisify(connection.query);
// module.exports.queryPromise = queryPromise;
