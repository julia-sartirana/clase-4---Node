const express = require('express');
const refugioController = require('../controllers/refugioControllers')
const router = express.Router() 

router.get('/', refugioController.getRefugios); 
router.get('/:id', refugioController.getRefugio);
router.post('/', refugioController.postRefugio);
router.put("/:id", refugioController.putRefugio);
router.delete("/:id", refugioController.deleteRefugio);

module.exports = router;