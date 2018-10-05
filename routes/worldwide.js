const router = require('express').Router();
const { worldwideTracks, worldwideArtists } = require('../controllers/worldwideController');

router.get('/tracks', worldwideTracks);
router.get('/artists', worldwideArtists);

module.exports = router;
