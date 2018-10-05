var express = require('express');
var router = express.Router();
const {show, getArtists, getTracks, getLyrik} = require('../controllers/country')

router.get('/', show)
router.get('/getartist/:code', getArtists)
router.get('/gettrack/:code', getTracks)
router.post('/getlyrik', getLyrik)
// router.get('/search/:key', searchCountry)

module.exports = router;