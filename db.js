const mysql = require("mysql");

function createConnection(host, user, database, password){
    const connection = mysql.createConnection({
        host,
        user,
        database,
        password,
    })
    connection.connect( (error)=>{
        if( error ){
            console.log('Error: ' + error.message);
        } else {
            console.log('MySQL is connected');
        }
    })
    return connection;
}
module.exports.connection = createConnection(process.env.HOST, process.env.USER, process.env.DATABASE, process.env.PASSWORD);
module.exports.createConnection = createConnection;

