const router = require('express').Router()
const inventaire  = require('../controllers/inventaire.controller')

router.get('/',inventaire.all)
module.exports = router