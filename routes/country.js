var express = require('express');
var router = express.Router();
const {show, getList, getLyrik, searchCountry} = require('../controllers/country')

router.get('/', show)
router.get('/getList/:code', getList)
router.post('/getlyrik', getLyrik)
// router.get('/search/:key', searchCountry)

module.exports = router;
