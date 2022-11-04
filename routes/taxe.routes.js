const router = require('express').Router()
const taxe = require('../controllers/taxe.controller')

router.get('/', taxe.all)
router.post('/add', taxe.add)
router.put('/:id', taxe.update)

module.exports = router