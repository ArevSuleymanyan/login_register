const { connection } = require("../db");

class User{
    getUserById(userId) {
        const sql = `SELECT * FROM users WHERE Id =${userId}`;
        connection.query(sql, (error, results) => {
            if(error){
                console.log(`Error from userService: ${error.message}`)
            }
             else {
                //  console.log( results[0]);
                return results[0];
            }
        })
    }
}
const userService = new User();
module.exports = userService;