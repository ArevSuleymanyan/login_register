const { connection } = require("../db");
const bcrypt = require('bcryptjs');


exports.addUser =  async (request, response ) => {
        const sql_insert = 'INSERT INTO users SET ?';
        // const sql_insert1 = 'SELECT * FROM users';

        const {name, email, password } = request.body;
        const  hashedPassword = await bcrypt.hash(password, 8);

        connection.query(sql_insert, {name, email, password:hashedPassword } ,  (error, results) => {
            if(error){
                console.log(error.message);
            }else {
                console.log(results)
                return response.render('login', {
                    message: 'User registered'
                })
            }
        })
}