const { connection } = require("../db");

class UserService {

    getUserById(userId){
        const sql = `SELECT * FROM users WHERE Id =${userId}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, results) => {
                if(error){
                    reject(error)
                } else {
                    resolve(results[0])
                }
            })
        })
    }
}
module.exports = UserService;