const router = require('express').Router()
const part = require('../controllers/part.controller')
router.get('/', part.all)
router.post('/add', part.add)
router.put('/:id', part.update)

module.exports = router