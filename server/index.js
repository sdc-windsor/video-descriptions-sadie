const express = require('express');
const app = express();
const pool = require('../database/index.js');
const faker = require('faker');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('public'));
app.use('/:id', express.static('public'));

app.get('/categories/:video_id', function (req, res) {
	pool.query('SELECT * FROM descriptions WHERE video_id = $1', [req.params.video_id])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))
});

app.get('/usersthumbnail/:user_id', function (req, res) {
	pool.query('SELECT * FROM users WHERE _id = $1', [req.params.user_id])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))
});

app.get('/userid/:username', function (req, res) {
	pool.query('SELECT * FROM users WHERE username = $1', [req.params.username])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))

})

app.get('/videosByCategory/:category', function (req, res) {
	pool.query('SELECT * FROM descriptions WHERE $1 = ANY (categories);', [req.params.categories])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))
});


app.get('/details/:video_id', function (req, res) {
	pool.query('SELECT * FROM descriptions WHERE video_id = $1', [req.params.video_id])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))
});


/// need full CRUD for description and comments
app.post('/comments/', function (req, res) {
	const _id = faker.random.alphaNumeric(10).toUpperCase();
	const {video_id, user_id, comment, date} = req.body;

	pool.query(
		'INSERT INTO comments (_id, video_id, user_id, comment, date) VALUES ($1, $2, $3, $4, $5)',
		[_id, video_id, user_id, comment, date])
		.then(() => {
			res.status(201).end();
		})
		.catch(e => {
			console.log(e)
			res.status(400).end();
		})
})

app.get('/comments/:video_id', function (req, res) {
	pool.query('SELECT * FROM comments WHERE video_id = $1 ORDER BY DATE DESC', [req.params.video_id])
		.then(data => {
			res.status(200).json(data.rows);
			res.end();
		})
		.catch(e => {
			console.log(e)
			res.status(404).end();
		})
});

app.get('/comments/', function (req, res) {
	//figure out pagnation
	// pool.query('SELECT * FROM comments ORDER BY video_id ASC', [req.params.video_id])
	// 	.then(data => {
	// 		res.json(data.rows);
	// 		res.end();
	// 	})
	// 	.catch(e => console.log(e))
});

app.put('/comments/:_id', function (req, res) {
	const date = new Date();
	pool.query(
		'UPDATE comments SET video_id = $1 user_id = $2, comment = $3, date = $4 WHERE _id = $1',
		[req.body.video_id, req.body.user_id, req.body.comment, date])
		.then(() => {
			res.status(200).end();
		})
		.catch(e => {
			console.log(e)
			res.status(404).end();
		})
})

app.delete('/comments/:_id', function (req, res) {
	pool.query('DELETE FROM comments WHERE _id = $1;', [req.params._id])
		.then(() => {
			res.status(204).end();
		})
		.catch(e => console.log(e))

})

app.post('/descriptions/', function (req, res) {
	const video_id = req.body.video_id;
	const description = req.body.description;
	const categories = "ARRAY" + JSON.stringify(req.body.categories);
	const likes = 0;
	pool.query(
		'INSERT INTO descriptions (video_id, description, categories, likes) VALUES ($1, $2, $3, $4)',
		[video_id, description, categories, likes])
		.then(() => {
			res.status(201).end();
		})
		.catch(e => {
			console.log(e)
			res.status(400).end();
		})
})

app.get('/descriptions/:video_id', function (req, res) {
	pool.query('SELECT * FROM descriptions WHERE video_id = $1', [req.params.video_id])
		.then(data => {
			res.status(200).json(data.rows[0]);
			res.end();
		})
		.catch(e => {
			console.log(e)
			res.status(404).end();
		})
});

app.get('/descriptions/', function (req, res) {
	// figure out pagnation
	// pool.query('SELECT * FROM descriptions WHERE video_id = $1 ORDER BY video_id ASC', [req.params.video_id])
	// 	.then(data => {
	// 		res.json(data.rows[0]);
	// 		res.end();
	// 	})
	// 	.catch(e => console.log(e))
});

app.put('/descriptions/:video_id', function (req, res) {
	const video_id = req.body.video_id;
	const description = req.body.description;
	const categories = "ARRAY" + JSON.stringify(req.body.categories);
	const likes = req.body.likes;
	pool.query(
		'UPDATE descriptions SET description = $2, categories = $3, likes = $4 WHERE video_id = $1',
		[[video_id, description, categories, likes]])
		.then(() => {
			res.status(200).end();
		})
		.catch(e => {
			console.log(e)
			res.status(404).end();
		})
})


app.delete('/descriptions/:video_id', function (req, res) {
	pool.query('DELETE FROM descriptions WHERE video_id = $1;', [req.params.video_id])
	.then(() => {
		res.status(204).end();
	})
	.catch(e => console.log(e))
})


module.exports = app;

