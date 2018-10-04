const router = require('express').Router()
const { listFavoriteTracks, listFavoriteArtists, favoriteTrackToggle, favoriteArtistToggle, test } = require('../controllers/favoritesController')
const isLogin = require('../middlewares/isLogin')

router.get('/tracks', isLogin, listFavoriteTracks)
router.get('/artists', isLogin, listFavoriteArtists)
router.get('/toggle/tracks/:trackid', isLogin, favoriteTrackToggle)
router.get('/toggle/artists/:artistid', isLogin, favoriteArtistToggle)
router.get('/test', test)

module.exports = router