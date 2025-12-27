const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rohit',
    database:'task_db'
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('mysql is connected successfully');
});

module.exports=connection;