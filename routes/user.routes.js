const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const uploadController = require('../controllers/upload.controller')
const multer = require("multer");
const upload = multer();

// authentification
router.get("/logout", authController.logout);
router.post('/signin', authController.signIn)

// user CRUD
router.post("/add", authController.signUp);
router.get("/",authController.all );
router.get('/:id', authController.userInfo);
router.put('/:id', authController.update);
router.delete('/:id', authController.remove)

// upload profil
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router