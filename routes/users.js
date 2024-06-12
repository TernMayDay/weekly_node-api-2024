var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// 正文
router.get('/', UsersControllers.getUsers);

module.exports = router;
