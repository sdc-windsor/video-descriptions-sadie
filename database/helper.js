const Description = require('./index.js').Description;
const Comment = require('./index.js').Comment;
const User = require('./index.js').User;
const mongoose = require('mongoose');

const saveDescription = async function(videoId, description, categories, likes, cb) {
    const instOfDescription = new Description({
        _id: new mongoose.Types.ObjectId(),
        video_id: videoId,
        description: description,
        categories: categories,
        likes: likes
    });
    await instOfDescription.save().then((data)=>{
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

const saveUser = async function(userName, userThumbnail, cb) {
    const instOfUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: userName,
        user_thumbnail: userThumbnail
    });
    await instOfUser.save().then((data)=>{
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

async function saveComment(videoId, userName, comment, date, cb) {
    const instOfComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        video_id : videoId,
        user_id: userName,
        comment: comment,
        date: date
    });
    await instOfComment.save().then((data)=>{
        cb(data);
    }).catch(err => console.log(err))
}

module.exports = {
    saveDescription,
    saveUser,
    saveComment
}

