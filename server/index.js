const express = require('express');
const app = express();
const pool = require('../database/index.js');
// const Description = require('../database/index').Description;
// const User = require('../database/index').User;
// const Comment = require('../database/index').Comment;
const faker = require('faker');
const saveComment = require('../database/helper').saveComment;
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

app.get('/comments/:video_id', function (req, res) {
	pool.query('SELECT * FROM comments WHERE video_id = $1', [req.params.video_id])
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

app.post('/comments/:video_id', function (req, res) {
	console.log('REQ BODY', req.body);
	saveComment(req.body.video_id, req.body.user_id, req.body.comment, req.body.date, () => {
		console.log('Saved comment to database')
		res.send('Saved comment to database');
		res.end();
	})

});

/// need full CRUD for description and comments
// POST /comments?video_id=2&user_id=2&comment=dogs+smell+bad
app.post('/comments', function (req, res) {
	let _id = faker.random.alphaNumeric(10).toUpperCase();
	let video_id = req.query.video_id;
	let user_id = req.query.user_id;
	let comment = req.query.comment;
	pool.query(
		'INSERT INTO comments (_id, video_id, user_id, comment) VALUES ($1, $2, $3, $4)',
		[_id, video_id, user_id, comment])
	.then(data => {
		console.log(data);
		res.send('Success');
		res.end();
	})
	.catch(e => console.log(e))
})

app.post('/descriptions/', function (req, res) {
})

app.put('/comments/', function (req, res) {

})

app.put('/descriptions/', function (req, res) {

})

app.delete('/comments/', function (req, res) {

})

app.delete('/descriptions/', function (req, res) {

})


module.exports = app;

