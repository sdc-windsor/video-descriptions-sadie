const app = require('./index.js');
const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));



