
const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log(`Server is up on ${port}`);
});

// UPLOAD TO GITHUB AND HEROKU