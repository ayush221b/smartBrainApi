const Clarifai = require('clarifai');

require('dotenv').config()

const app = new Clarifai.App({
	apiKey: process.env.API_KEY
});

const handleApiCall = (req, res) => {
	app.models
		.predict(e466caa0619f444ab97497640cefc4dc, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json(err))

}

const handleImage = (req, res, db) => {
	const {
		id
	} = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}