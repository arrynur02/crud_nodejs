const express = require('express');
const app = express();
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const port = 1000;
const path = require('path');

const db = require('./src/config/db');
const router = require('./src/routes/routes');
/*
	bikin variabel reques dari direktory config/db yg sudah dikonekan ke mysql
*/
app.use((req, res, next) => {
	req.db = db;
	next();
});
/*
	konfigurasi session express, flash
*/ 
app.use(session({
	secret: 'crud_nodejs',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 day
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },}
));
app.use(flash());

/*
	parse application/x-www-form-urlencoded
*/
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/*
	load direktory assets, bootstrap, jquery, sweetalert2
*/
app.use('/assets',express.static('assets'));
app.use('/bootstrap',express.static('node_modules/bootstrap/dist'));
app.use('/jquery',express.static('node_modules/jquery/dist'));
app.use('/sweetalert2',express.static('node_modules/sweetalert2/dist'));
/*
	inisialisasi view engine ejs
*/
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine','ejs');

/*
	inisialisasi router
*/
app.use(router);

/*
	inisialisasi server node
*/
app.listen(port,() => {
	console.log('listen server at http:localhost:',port);
});