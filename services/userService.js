const { connection } = require("../db");

class UserService {
   getUserById(userId) {
       let a;
        const sql = `SELECT * FROM users WHERE Id =${userId}`;
        connection.query(sql, (error, results) => {
            if(error){
                console.log(`Error from userService: ${error.message}`)
            }
           a = results[0]             
        })
        return a
    }
}
module.exports = UserService;