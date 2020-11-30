var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'classmysql.engr.oregonstate.edu',
  user : 'cs340_kimer',
  password : '7522',
  database : 'cs340_kimer',
});

module.exports.pool = pool;
