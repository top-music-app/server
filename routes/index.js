var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('login');
});

router.post('/signin/google', UserController.loginGoogle);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

module.exports = router;
