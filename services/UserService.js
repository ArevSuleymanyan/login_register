const { connection } = require('../db');
const util = require('util');
const queryPromisify = util.promisify(connection.query).bind(connection);

class UserService {
  getUserById(userId) {
    const sql = `SELECT * FROM users WHERE Id =${userId}`;
    return queryPromisify(sql)
      .then((result) => result[0])
      .catch((error) => console.log('error from promisify', error));
  }
}

module.exports = UserService;

