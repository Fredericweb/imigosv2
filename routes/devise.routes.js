const router = require('express').Router()
const devise = require('../controllers/devise.controller')

router.post('/add', devise.addDevise)
router.get('/', devise.allDevise)
router.put('/:id', devise.update)
router.delete('/:id', devise.remove)

module.exports = router