const router = require('express').Router()
const role = require('../controllers/role.controller')

router.get('/',role.all)
router.post('/add', role.add)
router.put('/:id', role.update)

module.exports = router