const { connection } = require("../db");

exports.getUserById = (id) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    
    connection.query(sql, id, (error, results ) => {
        if(error){
            console.log(error)
        } else {
            console.log(results[0])
        }
    })
}