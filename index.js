// importing from the express module in node_modules
const express = require('express');

// creating the express map
const app = express();

// Endpoints
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// starting of the server and on which port the server has to work.
app.listen(300, () => {
    console.log('Server is running on port 300.')
})
