const fs = require('fs')

const getGatitos = (req, res) => {	

	fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => {
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
const getGatito = (req, res) => {
	fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => {
			
		if(err) {
			return res.status(500).json({
				requestedAt: req.requestedAt,
				status: 'error',
				message: 'Ocurrio un error'
			});
		}
		const gatos = JSON.parse(data);
		const id = Number(req.params.id);
		const gatosFiltrados = gatos.filter(gato => gato.id === id)
		
		if (!gatosFiltrados.length) {
			return res.status(404).json({
				status: 'fail',
				message: 'Gato no encontrado'
			})
		}
		res.json({
			status: 'success',
			data: gatosFiltrados
		})
	});
}

const postGatito = (req, res) => {
	/* console.log(req.body) */
	  fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => {
		  const dataJSON = JSON.parse(data);
		  const nuevoGato = req.body;
		  nuevoGato.id = dataJSON.length
		  dataJSON.push(nuevoGato)
  
		  fs.writeFile(`${__dirname}/../assets/cats.json`, JSON.stringify(dataJSON), err => {
		  
			  res.status(201).json({
					requestedAt: req.requestedAt,
				  status: 'success',
				  data: {
						  nuevoGato,
						  createAt: new Date()
				  }
			  });
		  });
	  });
}
	
const putGatito = (req, res) => {
fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => {
	const dataJSON = JSON.parse(data);
	const nuevoGato = req.body;
	const id = Number(req.params.id);

	if (dataJSON.map((gatito) => gatito.id).includes(id)) {
	fs.writeFile(
		`${__dirname}/assets/cats.json`,
		JSON.stringify(dataJSON),
		(err) => {
		const i = dataJSON.map((gatito) => gatito.id).indexOf(id);

		const nuevoGatoId = { id: id, ...nuevoGato };
		dataJSON.splice(i, 1, nuevoGatoId);

		res.json({
			requestedAt: req.requestedAt,
			status: "Success",
			data: nuevoGatoId,
		});
		}
	);
	} else {
	res.status(404).json({
		status: "fail",
		message: "Gato no encontrado",
	});
	}
});
}
const deleteGatito = (req, res) => {
	fs.readFile(`${__dirname}/../assets/cats.json`, (err, data) => {
		const dataJSON = JSON.parse(data);
		const id = Number(req.params.id);

		if (dataJSON.map((gatito) => gatito.id).includes(id)) {
			fs.writeFile(
				`${__dirname}/assets/cats.json`,
				JSON.stringify(dataJSON),
				(err) => {
					const i = dataJSON.map((gatito) => gatito.id).indexOf(id);
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
				message: 'Gato no encontrado'
			});
		}
	});
}

module.exports = { getGatito, getGatitos, postGatito, deleteGatito, putGatito }