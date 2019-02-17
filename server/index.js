const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.static('./public'));

// app.get('/categories/:video_id', function (req, res) {

// });

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));