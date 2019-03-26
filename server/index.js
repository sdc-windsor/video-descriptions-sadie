const express = require('express');
const app = express();
const pool = require('../database/index.js');
// const Description = require('../database/index').Description;
// const User = require('../database/index').User;
// const Comment = require('../database/index').Comment;
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
	const arrayOfCategories = [];
	const splitParams = req.params.category.split(',');
	for (let l = 0; l < splitParams.length; l++) {
		arrayOfCategories.push({
			categories: {
				// "/mon/i"
				$regex: new RegExp(`${splitParams[l]}`, 'i')
			}
		})
	}

	Description.find({ $and: arrayOfCategories })
		.then((data) => {
			res.json(data);
			res.end();
		});

	pool.query('SELECT * FROM descriptions WHERE $1 = ANY (categories);', [req.params.categories])
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

module.exports = app;

