
const fs = require('fs')

const getRefugios = (req, res) => {
	fs.readFile(`${__dirname}/../assets/refugios.json`, (err, data) => {
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

const getRefugio = (req, res) => {
	fs.readFile(`${__dirname}/../assets/refugios.json`, (err, data) => {
			
		if(err) {
			return res.status(500).json({
				requestedAt: req.requestedAt,
				status: 'error',
				message: 'Ocurrio un error'
			});
		}
		const refugios = JSON.parse(data);
		const id = Number(req.params.id);
		const refugiosFiltrados = refugios.filter(refugio => refugio.id === id)
		
		if (!refugiosFiltrados.length) {
			return res.status(404).json({
				status: 'fail',
				message: 'Refugio no encontrado'
			})
		}
		res.json({
			status: 'success',
			data: refugiosFiltrados
		})
	});
}

const postRefugio = (req, res) => {
	fs.readFile(`${__dirname}/../assets/refugios.json`, (err, data) => {
		const dataJSON = JSON.parse(data);
		const nuevoRefugio = req.body;
		nuevoRefugio.id = dataJSON.length
		dataJSON.push(nuevoRefugio)

		fs.writeFile(`${__dirname}/../assets/refugios.json`, JSON.stringify(dataJSON), err => {
		
			res.status(201).json({
				requestedAt: req.requestedAt,
				status: 'success',
				data: {
						nuevoRefugio,
						createAt: new Date()
				}
			});
		});
	});
}

const deleteRefugio = (req, res) => {
	fs.readFile(`${__dirname}/../assets/refugios.json`, (err, data) => {
		const dataJSON = JSON.parse(data);
		const id = Number(req.params.id);

		if (dataJSON.map((refugio) => refugio.id).includes(id)) {
			fs.writeFile(
				`${__dirname}/assets/refugios.json`,
				JSON.stringify(dataJSON),
				(err) => {
					const i = dataJSON.map((refugio) => refugio.id).indexOf(id);
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
				message: 'Refugio no encontrado'
			});
		}
	});
}

const putRefugio = (req, res) => {
	fs.readFile(`${__dirname}/../assets/refugios.json`, (err, data) => {
		const dataJSON = JSON.parse(data);
		const nuevoRefugio = req.body;
		const id = Number(req.params.id);
	
		if (dataJSON.map((refugio) => refugio.id).includes(id)) {
		fs.writeFile(
			`${__dirname}/assets/refugios.json`,
			JSON.stringify(dataJSON),
			(err) => {
			const i = dataJSON.map((refugio) => refugio.id).indexOf(id);
	
			const nuevoRefugioId = { id: id, ...nuevoRefugio };
			dataJSON.splice(i, 1, nuevoRefugioId);
	
			res.json({
				requestedAt: req.requestedAt,
				status: "Success",
				data: nuevoRefugioId,
			});
			}
		);
		} else {
		res.status(404).json({
			status: "fail",
			message: "Refugio no encontrado",
		});
		}
	});
}

module.exports = { getRefugio, getRefugios, postRefugio, deleteRefugio, putRefugio }