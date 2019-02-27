//This find is used to test out the database using command node testing.js
var Comment = require('./database/index.js').Comment;

Comment.find({ video_id: 2 }).sort({date: -1}).limit(10).exec().then(data=>{console.log(data.length)})