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


app.get('/details/:video_id', function (req, res) {
	pool.query('SELECT * FROM descriptions WHERE video_id = $1', [req.params.video_id])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))
});



/// need full CRUD for description and comments
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

app.get('/comments/:video_id', function (req, res) {
	pool.query('SELECT * FROM comments WHERE video_id = $1', [req.params.video_id])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))
});

app.put('/comments', function (req, res) {
	pool.query(
		'UPDATE comments SET user_id = $2, comment = $3 WHERE video_id = $1',
		[req.query.video_id, req.query.user_id, req.query.comment])
		.then(data => {
			console.log(data);
			res.send('updated');
			res.end();
		})
		.catch(e => console.log(e))
})

app.delete('/comments', function (req, res) {
	pool.query('DELETE FROM comments WHERE video_id = $1;', [req.params.video_id])
		.then(data => {
			res.send('deleted')
			res.end();
		})
		.catch(e => console.log(e))

})

app.post('/descriptions', function (req, res) {
	let video_id = req.query.video_id;
	let description = req.query.description;
	let categories = "ARRAY" + JSON.stringify(req.query.categories.split(' '));
	let likes = 0;
	pool.query(
		'INSERT INTO descriptions (video_id, description, categories, likes) VALUES ($1, $2, $3, $4)',
		[video_id, description, categories, likes])
		.then(data => {
			console.log(data);
			res.send('Success');
			res.end();
		})
		.catch(e => console.log(e))
})

app.get('/descriptions/:video_id', function (req, res) {
	pool.query('SELECT * FROM descriptions WHERE video_id = $1', [req.params.video_id])
		.then(data => {
			res.json(data.rows[0]);
			res.end();
		})
		.catch(e => console.log(e))
});

app.put('/descriptions', function (req, res) {
	let video_id = req.query.video_id;
	let description = req.query.description;
	let categories = "ARRAY" + JSON.stringify(req.query.categories.split(' '));
	let likes = req.query.likes;
	pool.query(
		'UPDATE descriptions SET description = $2, categories = $3, likes = $4 WHERE video_id = $1',
		[[video_id, description, categories, likes]])
		.then(data => {
			console.log(data);
			res.send('updated');
			res.end();
		})
		.catch(e => console.log(e))
})


app.delete('/descriptions', function (req, res) {
	pool.query('DELETE FROM descriptions WHERE video_id = $1;', [req.params.video_id])
		.then(data => {
			res.send('deleted')
			res.end();
		})
		.catch(e => console.log(e))
})


module.exports = app;

