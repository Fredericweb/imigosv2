const router = require('express').Router()
const typeFact = require('../controllers/typeFact.controller')

router.get('/', typeFact.all)
router.post('/add', typeFact.add)
router.put('/:id', typeFact.update)
module.exports = router