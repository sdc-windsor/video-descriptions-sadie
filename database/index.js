const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fec');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    // we're connected!
    console.log('Connected to db!')
});

const descriptionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    video_id: {
        type: Number,
        unique: true,
        dropDups: true
    },
    description: String,
    Categories: [String],
    likes: Number
});

const Description = mongoose.model('Description', descriptionSchema);

// var description = new Description({
//     video_id: 1,
//     description: 'Sups',
//     Categories: ['food', 'fun'],
// })

// description.save().then(()=>{
//     console.log('saved to db')
// })

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    video_id: Number,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: String,
    date: String
});

const Comment = mongoose.model('Comment', commentSchema);

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: Number,
    user_thumbnail: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
    Description,
    Comment,
    User
}
