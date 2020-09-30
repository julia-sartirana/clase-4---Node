const express = require('express');

// const morgan = require('morgan')
// libreria morgan, loguea en la consola info util para mis pedidos
const app = express();
const userRouter = require('./routes/usersRoutes')
const gatitoRouter = require('./routes/gatitoRoutes')
const refugioRouter = require('./routes/refugioRoutes')

app.use(express.json()); // para tener el body en la consola

/* app.use((res, req, next) => {
	console.log("estoy en un middleware");
	next();
})
app.use((req, res, next) => {
	req.requestedAt = new Date().toISOString();
	next();
}) */

app.use('/gatitos', gatitoRouter)
app.use('/users', userRouter)
app.use('/refugios', refugioRouter)

module.exports = app;


// gatitos ---> gatitos
// users ---> admin, mad, clientes
// refugios

