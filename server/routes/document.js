const express = require('express');
const router = express.Router();
var multer = require('multer')

/********* import controllers ********/
const documentController = require('../controllers/upload');

/********* Routes *********/
router.post('/uploadFile', multer().single('file'), documentController.uploadFile);
router.get('/getDocuments', documentController.getDocuments);
router.get('/getUploadFile', documentController.getUploadFile);

module.exports = router;