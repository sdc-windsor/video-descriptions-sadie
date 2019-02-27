const express = require('express');
const app = express();
const Description = require('../database/index').Description;
const User = require('../database/index').User;
const Comment = require('../database/index').Comment;
// const PORT = 8080 || process.env.PORT;

app.use(express.static('./public'));

app.get('/categories/:video_id', function (req, res) {
    Description.findOne({video_id: req.params.video_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/usersthumbnail/:user_id', function (req, res) {
    User.findOne({_id: req.params.user_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/videosByCategory/:category', function (req, res) {
    console.log(req.params.category)
    const arrayOfCategories = [];
    const splitParams = req.params.category.split(',');
    for (let l = 0 ; l< splitParams.length;l++) {
        arrayOfCategories.push({
            categories: {
                // "/mon/i"
                $regex : new RegExp(`${splitParams[l]}`,'i')
            }
        })
    }

    Description.find({$and: arrayOfCategories})
               .then((data)=>{
                    res.json(data);
                    res.end();
                });
});

app.get('/comments/:video_id', function (req, res) {
    Comment.find({video_id: req.params.video_id}).sort({data:-1}).exec().then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/details/:video_id', function (req, res) {
    Description.find({video_id: req.params.video_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

module.exports = app;
