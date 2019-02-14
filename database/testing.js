const Description = require('./index.js').Description;
const Comment = require('./index.js').Comment;
const User = require('./index.js').User;

const description = new Description({
    video_id: 1,
    description: 'Sups',
    Categories: ['food', 'fun'],
})

description.save().then(()=>{
    console.log('saved to db')
})

const user = new User({
    username: "Huy",
    user_thumbnail: 'String'
});

user.save().then(()=>{
    console.log('saved to db')
})

const value = User.find({
    username: 'Huy'
}).exec();
// const comment = new Comment({
//     video_id = 1,
//     user_id: ,
//     comment: 'This is a comment',
//     date: '01-01-2018'
// })
// description.save().then(()=>{
//     console.log('saved to db')
// })

console.log(value);