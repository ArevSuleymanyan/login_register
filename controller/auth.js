const { connection } = require("../db");
const bcrypt = require('bcryptjs');
const userService = require("../services/userService");


exports.register = (request, response) => {
    const { name, email, password, confirmPassword } = request.body;
    const sql_select = 'SELECT email FROM users WHERE email=?';

    connection.query(sql_select, [email], (error, results) => {
        if(error){
            console.log(error.message);
            return;
        }
        if( results.length > 0){
            return response.render('register', {
                message: 'That email is already in use'
            })
        }
        if(!email || !name || !password || !confirmPassword){
            return response.render('register', {
                message: 'Fill in all the fields'
            })
        }

        if(password !== confirmPassword){
            return response.render('register', {
                message: 'Passwords do not match'
            })
        }
        userService.addUser(request, response)
        // const hashedPassword = await bcrypt.hash(password, 8);
        // const sql_insert = 'INSERT INTO users SET ?';

        // userService.addUser()
        // connection.query( sql_insert, { name, email, password: hashedPassword } , (error, results) => {
        //     if(error){
        //         console.log(error.message);
        //         return;
        //     } else {

        //         return response.render('login', {
        //             message: 'User registered'
        //         })
        //     }
        // })
    })
    
}

exports.login = (request, response) => {
    const { email, password } = (request.body || {} );
    if( !email || !password ){
        return response.status(400).render('login', {
            message: 'Please provide an email and password'
        });
    }
}

exports.check = (request, response) => {
}



