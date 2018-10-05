const router = require('express').Router();
const { worldwideTracks, worldwideArtists } = require('../controllers/worldwideController');
const isLogin = require('../middlewares/isLogin');

router.get('/tracks', isLogin, worldwideTracks);
router.get('/artists', isLogin, worldwideArtists);

module.exports = router;
