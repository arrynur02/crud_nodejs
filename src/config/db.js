const mysql = require('mysql2');

/*
	konfigurasi database mysql
*/

let db_host = 'localhost';
let db_user = 'root';
let db_pass = '';
let db_name = 'crud_node';

var db = mysql.createConnection({
	host    :db_host,
	user    :db_user,
	password:db_pass,
	database:db_name
});

console.log('connect at database name :',db_name);

module.exports = db;