/* const checkId = (req, res, next, val) => {
  console.log(val)  
  if (val > 4) return res.status(404).end('Usuario no encontrado')
  next()
} */
const fs = require('fs')

const getUsers = (req, res) => {
	fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => {
		const dataJSON = JSON.parse(data)
		res.json({
			requestedAt: req.requestedAt,
			status: 'success',
			data: dataJSON,
		});
		if(err) {
			res.sendStatus(500).send("Algo anda mal");
		}
	});  
}

const getUser = (req, res) => {
	fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => {
			
		if(err) {
			return res.status(500).json({
				requestedAt: req.requestedAt,
				status: 'error',
				message: 'Ocurrio un error'
			});
		}
		const users = JSON.parse(data);
		const id = Number(req.params.id);
		const usersFiltrados = users.filter(user => user.id === id)
		
		if (!usersFiltrados.length) {
			return res.status(404).json({
				status: 'fail',
				message: 'Usuario no encontrado'
			})
		}
		res.json({
			status: 'success',
			data: usersFiltrados
		})
	});
}

const postUser = (req, res) => {
	fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => {
		const dataJSON = JSON.parse(data);
		const nuevoUser = req.body;
		nuevoUser.id = dataJSON.length
		dataJSON.push(nuevoUser)

		fs.writeFile(`${__dirname}/../assets/users.json`, JSON.stringify(dataJSON), err => {
		
			res.status(201).json({
				requestedAt: req.requestedAt,
				status: 'success',
				data: {
						nuevoUser,
						createAt: new Date()
				}
			});
		});
	});
}

const deleteUser = (req, res) => {
	fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => {
		const dataJSON = JSON.parse(data);
		const id = Number(req.params.id);

		if (dataJSON.map((user) => user.id).includes(id)) {
			fs.writeFile(
				`${__dirname}/assets/users.json`,
				JSON.stringify(dataJSON),
				(err) => {
					const i = dataJSON.map((user) => user.id).indexOf(id);
					dataJSON.splice(i, 1);

					res.json({
						requestedAt: req.requestedAt,
						status: "success",
						data: dataJSON,
					});
				}
			)
		} else {
			res.status(404).json({
				status: 'fail',
				message: 'Usuario no encontrado'
			});
		}
	});
}

const putUser = (req, res) => {
	fs.readFile(`${__dirname}/../assets/users.json`, (err, data) => {
		const dataJSON = JSON.parse(data);
		const nuevoUser = req.body;
		const id = Number(req.params.id);
	
		if (dataJSON.map((user) => user.id).includes(id)) {
		fs.writeFile(
			`${__dirname}/assets/users.json`,
			JSON.stringify(dataJSON),
			(err) => {
			const i = dataJSON.map((user) => user.id).indexOf(id);
	
			const nuevoUserId = { id: id, ...nuevoUser };
			dataJSON.splice(i, 1, nuevoUserId);
	
			res.json({
				requestedAt: req.requestedAt,
				status: "Success",
				data: nuevoUserId,
			});
			}
		);
		} else {
		res.status(404).json({
			status: "fail",
			message: "Usuario no encontrado",
		});
		}
	});
}

module.exports = { getUser, getUsers, postUser, deleteUser, putUser/* , checkId  */}