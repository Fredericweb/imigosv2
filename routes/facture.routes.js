const router = require('express').Router()
const facture = require('../controllers/facture.controller')
router.get('/', facture.all)

module.exports = router