const mysql = require('mysql');
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydb"
});

con.connect((err) => {
    if(err) throw err;
    else
    console.log('Connected');
});

module.exports = con;