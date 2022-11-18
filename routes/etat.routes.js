const router = require('express').Router()
const etat = require('../controllers/etat.controller')

router.get('/', etat.all)

module.exports = router