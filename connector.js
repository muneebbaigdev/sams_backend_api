const mysql = require("mysql2")

const con = mysql.createConnection({
    host: "192.168.100.2",
    user: "root",
    password: "root",
    database: "attendence",
    port: 3306
});

con.connect((err)=>{
    if (err) throw err;
    console.log("connection created..!!");
});

module.exports.con = con;
