const router = require('express').Router()
const filiale = require('../controllers/filiale.controller')

router.post('/add',filiale.add)
router.get('/',filiale.all)
router.put('/:id', filiale.update)
router.delete('/:id', filiale.remove)
module.exports = router