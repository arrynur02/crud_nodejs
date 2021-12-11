const user_model = require('../models/user');
const fs = require('fs');

exports.index = (req, res, next) => {
	
	/*
		req.connect_db panggil request yg dibikin di file app.js, 
		panggil model kemudian function
	*/
	user_model.getalldtUser(req.db, (err, results) => {
		
		/*kondisi jika error database*/
		if (err) throw err;

		res.render('home/home',{
			title:'Simple Crud Nodejs, Bootstrap 5, datatables',
			user:results
		});
		next(); // middleware
	});	
}

exports.message = (req, res) => {

	res.json({
		msg_info:req.flash('msg_info'),
		msg_data:req.flash('msg_data'),
	});
}

exports.tambah = (req, res) => {
	
	res.render('home/tambah',{
		title:'Tambah Data'
	});

}

exports.tambah_user = (req, res) => {
	
	/*bikin variabel request body dri form*/
	let input_req = req.body;

	/*
		tambah ke database sesuai request,
		nama kolom : request . atribute name
	*/
	let data = {
		nama:input_req.nama_ins,
		avatar:req.file.filename,
		email:input_req.email_ins,
		telp:input_req.telp_ins,
		jenis_kel:input_req.jk_ins,
	}

	/*utk mengecek apakah berhasil/gagal menggunakan metode try_catch block, kemudian set flashdata*/
	try {
		user_model.tambah(req.db, data, (err, results) => {
			if (err) throw err;
		});
		req.flash('msg_info','success');
		req.flash('msg_data','berhasil tambah data..');
	} catch(e) {
		req.flash('msg_info','error');
		req.flash('msg_data','gagal tambah data!');
		// statements
		console.log(e);
	}
	res.redirect('/');
}

exports.hapus_user = (req, res) => {
	
	/*ambil parameter yg dibuat di router*/

	let userid = req.params.id;

	user_model.getdtbyUserid(req.db, userid, (err, results) => {
		console.log('unlink at path directory:',results[0].avatar);
		fs.unlink('./assets/upload/'+results[0].avatar, (err) => { return true });
	});

	try {
		user_model.hapus(req.db, userid, (err, results) => {
			if (err) throw err;
		});
		req.flash('msg_info','success');
		req.flash('msg_data','berhasil hapus data..');
	} catch(e) {
		req.flash('msg_info','error');
		req.flash('msg_data','gagal hapus data!');
		// statements
		console.log(e);
	}
	res.redirect('/');

}

exports.edit = (req, res) => {
	
	let userid = req.params.id;

	user_model.getdtbyUserid(req.db, userid, (err, results) => {

		res.render('home/edit',{
			title:'Edit Data',
			user:results
		});

	})

}

exports.edit_user = (req, res) => {

	/*ambil parameter yg dibuat di router*/
	let userid = req.params.id;

	/*bikin variabel request body dri form*/
	let input_req = req.body;
	/* upload form data */
	
	/* utk mengecek  request form data melalui konsol */
	console.log(req.file, req.body);
	
	/*
		bikin kondisi jika upload gambar, remove gambar lama
	*/
	if (req.file){
		fs.unlink('./assets/upload/'+input_req.avatarlama_edit, (err) => {
			console.log('failed unlink directory!:',err);
		});
		
		/*bikin variabel utk di simpan ke database, jika upload gambar*/
		var avatar = req.file.filename;
	}else{

		/*bikin variabel utk di simpan ke database, jika tidak upload gambar*/
		var avatar = input_req.avatarlama_edit;
	}

	/*
		tambah ke database sesuai request,
		nama kolom : request . atribute name
	*/
	let data = {
		nama:input_req.nama_edit,
		avatar:avatar,
		email:input_req.email_edit,
		telp:input_req.telp_edit,
		jenis_kel:input_req.jk_edit,
	}

		/*utk mengecek apakah berhasil/gagal menggunakan metode try_catch block, kemudian set flashdata*/
		try {
			user_model.edit(req.db, userid, data, (err, results) => {
				if (err) throw err;
			});
			req.flash('msg_info','success');
			req.flash('msg_data','berhasil edit data..');
		} catch(e) {
			req.flash('msg_info','error');
			req.flash('msg_data','gagal edit data!');
			// statements
			console.log(e);
		}

	res.redirect('/');
}