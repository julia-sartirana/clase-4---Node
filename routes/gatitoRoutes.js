const express = require('express');

const { getGatito, getGatitos, postGatito, putGatito, deleteGatito } = require('../controllers/gatitoControllers')
const router = express.Router() 

router.get('/', getGatitos); 
router.get('/:id', getGatito );
router.post('/', postGatito);
router.put("/:id", putGatito);
router.delete("/:id", deleteGatito);

module.exports = router;

// orden

// requires
// middleware
// 