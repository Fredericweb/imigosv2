const router = require('express').Router()
const facture = require('../controllers/facture.controller')

router.get('/', facture.all)
router.post('/periode', facture.all)

module.exports = router