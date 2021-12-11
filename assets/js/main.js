(function(){

	'use strict';

	/*
		panggil ajax request utk message
	*/
	$.ajax({
		type:'get',
		url:'/message'
	})
	.done(res => {
		if (res.msg_data == "" && res.msg_info == "")
		console.log(res);
		else
		Swal.fire({
			title:'',
			text:res
				.msg_data
				.toString(),
			icon:res
				.msg_info
				.toString(),
			width:350
		});
	})
	.catch(err => console.log(err));

	var table_user = $('#table_user')

	table_user.dataTable();

	table_user.on('click','.btn-hapus-user', function(){

		var id = $(this).attr('userid');

		Swal.fire({
	      title: 'Anda yakin?',
	      text: "ingin hapus data ini!",
	      icon: 'warning',
	      showCancelButton: true,
	      confirmButtonColor: '#3085d6',
	      cancelButtonColor: '#d33',
	      confirmButtonText: 'Oke!',
	      cancelButtonText: 'Batal'
	    })
	    .then(result => {
	    	if(result.value)
	    		document.location.href = '/'+id+'/hapus_user';
	    })
	});

	$('input[type="file"]').on('change',function(e){
		let sUrl = URL.createObjectURL(e.target.files[0]);
		$(this).next('img').attr('src',sUrl);
	});

}($));