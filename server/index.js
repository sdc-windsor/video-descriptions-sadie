const express = require('express');
const app = express();
const Description = require('../database/index').Description;
const User = require('../database/index').User;
// const PORT = 8080 || process.env.PORT;

app.use(express.static('./public'));

app.get('/categories/:video_id', function (req, res) {
    Description.findOne({video_id: req.params.video_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/usersthumbnail/:name', function (req, res) {
    User.findOne({username: req.params.name}).then((data)=>{
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

module.exports = app;
