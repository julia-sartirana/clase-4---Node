const express = require('express');
const userController = require('../controllers/userControllers')
const router = express.Router() // va a escuchar especificamente a estas rutas


router.param('id', (req, res, next, val) => {
  console.log(val)  
  if (val > 4) returnres.status(404).end('Usuario no encontrado')
  next()
})

/* router.param('id', userController.checkId) */
router.get('/', userController.getUsers); 
router.get('/:id', userController.getUser);
router.post('/', userController.postUser);
router.put("/:id", userController.putUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;