const router = require('express').Router()
const facture = require('../controllers/facture.controller')

router.get('/bydate', facture.byDate)
router.put('/:idFact', facture.update)
router.put('/etat/:id', facture.updateEtat)
router.get('/infofact/:id', facture.infoFact)

module.exports = router