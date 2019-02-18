const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;
const Description = require('../database/index').Description;

app.use(express.static('./public'));

app.get('/categories/:video_id', function (req, res) {
    Description.findOne({video_id: req.params.video_id}).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.get('/videosByCategory/:category', function (req, res) {
    // console.log(req.params.category)
    Description.find(
            {categories: {$in:  [req.params.category] }}
        ).then((data)=>{
        res.json(data);
        res.end();
    })
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));