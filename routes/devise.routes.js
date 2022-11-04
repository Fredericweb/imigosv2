const router = require('express').Router()
const devise = require('../controllers/devise.controller')

router.post('/add', devise.addDevise)
router.get('/', devise.allDevise)
router.put('/:id', devise.update)

module.exports = router