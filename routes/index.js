var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const isLogin = require('../middlewares/isLogin')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('login');
});

router.post('/signin/google', UserController.loginGoogle);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/check', isLogin, (req, res) => { res.status(200).json({isLogin: true}) })

router.get('/userinfo', isLogin, UserController.getUserInfo);

module.exports = router;
