const { connection } = require("../db");

class UserService {
    getUserById(userId) {
        const sql = `SELECT * FROM users WHERE Id =${userId}`;
        // connection.query(sql, (error, results) => {
        //     if(error){
        //         console.log(`Error from userService: ${error.message}`)
        //     }
        //    return results[0]             
        // })
        
    }
}
module.exports = UserService;