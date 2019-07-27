var express = require('express');
var router = express.Router();
var users = require('../controllers/users')


router.get('/', users.find);
router.get('/:email', users.findOneByEmail);
router.get('/:uid', users.findOneByUid);
router.post('/create-user', users.createUser);
router.post('/delete-user', users.deleteUser);
router.post('/update-user', users.updateUser);



module.exports = router;