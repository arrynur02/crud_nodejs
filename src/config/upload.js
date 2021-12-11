const multer = require('multer');

/*
	disini bikin function initialisasi utk upload file dengan package multer
*/

const storage = multer.diskStorage({
	/* path direktory terupload file */
  destination: function (req, file, results) {
    results(null, './assets/upload');
  },
	/* utk nama file jika terupload */
  filename: function (req, file, results) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    results(null,uniqueSuffix + '-' + file.originalname);
  }
});

var upload = multer({ storage:storage });

module.exports =  upload;

