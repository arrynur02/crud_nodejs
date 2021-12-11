const getalldtUser = (db, callback_fn) => {
	db.query('SELECT * FROM tbl_user ORDER BY user_id DESC', callback_fn);
}
const getdtbyUserid = (db, userid, callback_fn) => {
	db.query('SELECT * FROM tbl_user WHERE user_id='+userid, callback_fn);
}
const tambah = (db, data, callback_fn) => {
	db.query('INSERT INTO tbl_user SET ?', data, callback_fn);
}
const edit = (db, userid, data, callback_fn) => {
	db.query('UPDATE tbl_user SET ? WHERE user_id='+userid, data, callback_fn);
}
const hapus = (db, userid, callback_fn) => {
	db.query('DELETE FROM tbl_user WHERE user_id='+userid, callback_fn);
}

/*
	export modul model biar terhubung
*/
module.exports = {
	getalldtUser,
	getdtbyUserid,
	tambah,
	edit,
	hapus
}