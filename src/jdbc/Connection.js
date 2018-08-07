var mysql = require('mysql');
var config = require('../resources/config');

var Connection = {};

Connection.getConnection = function() {
  //console.log(config.database);
  var con = mysql.createConnection({
    host: config.database.host,
    user: config.database.userName,
    password: config.database.password,
    database: config.database.database
  });
  try {
    con.connect();
    console.log("database connected");
    return con;
  } catch (e) {
    console.log(e);
  }
}

module.exports = Connection;
