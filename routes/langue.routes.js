const router = require('express').Router()
const langue = require('../controllers/langue.controller')

router.post('/add', langue.add)
router.get('/',langue.all)
router.put('/:id',langue.update)

module.exports = router