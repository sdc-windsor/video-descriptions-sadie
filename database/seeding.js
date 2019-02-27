const faker = require('faker');
const videoData = require('../videoData_json.js');
const saveUser = require('./helper.js').saveUser;
const User = require('./index').User;
const Description = require('./index').Description;
const saveDescription = require('./helper.js').saveDescription;
const saveComment = require('./helper').saveComment;

//create 10 categories
const categories = ['Animation', 'Comedy', 'Music', 'Education', 'Art & Design', 'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism']

//function that generate a random number of categories for each video
const randomLength = function () {
    return (Math.floor(Math.random() * Math.floor(categories.length))) + 1;
}

//function that generate a random index of categories array
const randomInd = function () {
    return (Math.floor(Math.random() * Math.floor(categories.length)));
}

//generate an array of categories for each video
const generateCategories = function () {
    var cat = [];
    for (let len = 0; len < randomLength(); len++) {
        const randomIndex = randomInd();
        if(cat.indexOf(categories[randomIndex])<0) {
            cat.push(categories[randomIndex]);
        }
    }
    return cat;
}


//function that save user data into database
async function logUser () {
    for (let i = 0; i < 100; i++) {
        const randomUserAvatar = await faker.internet.avatar();
        await saveUser(videoData[i].author, randomUserAvatar, function(data) {
            console.log(data);
        })
    }
}


logUser();

//function that save video description to database
async function logDescription() {
    for (let i = 1; i < 101; i ++) {
        const randomDescription = await faker.lorem.paragraph();
        await saveDescription( i, randomDescription, generateCategories(),function(){
            console.log(`description ${i} has been saved!`)
        })
    }
}

logDescription();

//function that save video comments to database
async function logComment() {
    for (let i = 1; i < 101; i++) {
        for (let j = 0; j < 10; j++) {
            const randomComment = await faker.lorem.sentences();
            const randomDate = await faker.date.past();
            await saveComment(i, videoData[i - 1].author, randomComment, randomDate, () => {
                console.log(i,j)
            })
        }

    }
}

logComment();



