const router = require('express').Router()
const authController = require('../controllers/auth.controller')

// authentification
router.get("/logout", authController.logout);
router.post('/signin', authController.signIn)

// user CRUD
router.post("/add", authController.signUp);
router.get("/",authController.all );
router.get('/:id', authController.userInfo);
router.put('/:id', authController.update);
router.delete('/:id', authController.remove)


module.exports = router