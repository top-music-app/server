const router = require('express').Router()
const { listFavoriteTracks } = require('../controllers/favoritesController')
const { isLogin } = require('../middlewares/isLogin')

router.get('/', (req, res) => { res.send('test') })
router.get('/tracks', isLogin, listFavoriteTracks)

module.exports = router