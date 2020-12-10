const { connection } = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = (request, response) => {

    const { name, email, password, confirmPassword } = request.body;
    const sql_select = 'SELECT email FROM users WHERE email=?';

    connection.query(sql_select, email, async (error, results) => {
        if(error) {
            console.log(`Error: ${error.message}`);
            return;
        }
        if( results.length > 0) {
            return response.render('register', {
                message: 'That email is already in use',
            })
        }
        if(!email || !name || !password || !confirmPassword) {
            return response.render('register', {
                message: 'Fill in all the fields',
            })
        }
        if(password !== confirmPassword) {
            return response.render('register', {
                message: 'Passwords do not match',
            })
        }

        const sql_insert = 'INSERT INTO users SET ?';
        const  hashedPassword = await bcrypt.hash(password, 8);

        connection.query(sql_insert, {name, email, password:hashedPassword } ,  (error, results) => {
            if(error){
                console.log(`Error: ${error.message}`);
            }else {
                return response.render('login', {
                    message: 'User registered',
                })
            }
        })
    })
    
}



exports.login = (request, response) => {
    
    const { email, password } = (request.body || {} );
    if( !email || !password ) {
        return response.status(400).render('login', {
            message: 'Please provide an email and password',
        });
    }
    try {
        connection.query('SELECT * FROM users WHERE  email = ?', [email], async (error, results) => {
            if(!results.length || !(await bcrypt.compare(password, results[0].password))) {
                return response.status(401).render('login', {
                    message: 'Email or Password incorrect',
                }) 
            } else {
                const id = results[0].Id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                })
                const cookieOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60),
                    httpOnly: true
                }
                response.cookie('jwt', token, cookieOptions);
                return response.status(200).redirect('/');
            }
        })
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}






