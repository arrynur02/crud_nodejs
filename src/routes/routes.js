const express = require('express');
const router = express.Router();
const upload = require('../config/upload');

const home_controller = require('../controllers/home');

router.get('/', home_controller.index);
router.get('/message', home_controller.message);
router.get('/tambah', home_controller.tambah);
router.get('/:id/edit', home_controller.edit); /*bikin parameter router (:id)*/ 
router.post('/tambah_user', upload.single('avatar_ins'), home_controller.tambah_user); /* avatar_ins adalah atribute name dari form */
router.post('/:id/edit_user', upload.single('avatar_edit'), home_controller.edit_user); /* avatar_edit adalah atribute name dari form */
router.get('/:id/hapus_user', home_controller.hapus_user); /*bikin parameter router (:id)*/ 

module.exports = router;